import React, { useState,useEffect,useMemo } from 'react';
import { getSalesReport } from '../services/apiService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './Report.css'; 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getLocalDateTime = (date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
};

const CATEGORIES =["Hot Beverages","Cold Beverages","Pastries","Sandwiches"]

const Reports = () => {
  // const [startDate, setStartDate] = useState(getLocalDateTime(new Date(new Date().setHours(0, 0, 0, 0))));
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); 
    date.setHours(0, 0, 0, 0);      
    return getLocalDateTime(date);
  });
  // const [endDate, setEndDate] = useState(getLocalDateTime(new Date()));
  const [endDate, setEndDate] = useState(() => {
    return getLocalDateTime(new Date()); 
  });
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState(null); //not used

const fetchReportData = async (start, end) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSalesReport(start, end);
      setReportData(response.data);
    } catch (err) {
      setError('Failed to fetch report data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReportData(startDate, endDate);
  }, []); 

  // const handleGenerateReport = async () => {
  //   setError(null);
  //   try {
  //     const response = await getSalesReport(startDate, endDate);
  //     const data = response.data;
  //     setReportData(data);

  //     const salesValues = CATEGORIES.map(catName => {
  //       const found = data.salesByCategory.find(item => item.category === catName);
  //       return found ? found.totalSales : 0;
  //     });

  //     setChartData({
  //       labels: CATEGORIES,
  //       datasets: [
  //         {
  //           label: 'Sales ($)',
  //           data: salesValues,
  //           backgroundColor:[
  //             'rgba(255, 99, 132, 0.6)',
  //             'rgba(54, 162, 235, 0.6)',
  //             'rgba(255, 206, 86, 0.6)',
  //             'rgba(75, 192, 192, 0.6)'
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     });
  //   } catch (err) {
  //     setError('Failed to fetch report.');
  //     console.error(err);
  //   }
  // };


  const handleGenerateReport = () => {
    fetchReportData(startDate, endDate);
  };
  // const salesByCategoryData = {
  //   labels: ['Hot Drinks', 'Cold Drinks', 'Pastries', 'Sandwiches'],
  //   datasets: [
  //     {
  //       label: 'Sales ($)',
  //       data: [1200, 900, 600, 300], 
  //       backgroundColor: 'rgba(0, 123, 255, 0.6)',
  //     },
  //   ],
  // };



    const chartConfig = useMemo(() => {
    if (!reportData || !reportData.salesByCategory) return null;

    const salesValues = CATEGORIES.map(catName => {
      const found = reportData.salesByCategory.find(item => item.category === catName);
      return found ? found.totalSales : 0;
    });

    return {
      labels: CATEGORIES,
      datasets: [
        {
          label: 'Sales ($)',
          data: salesValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', 
            'rgba(54, 162, 235, 0.6)', 
            'rgba(255, 206, 86, 0.6)', 
            'rgba(75, 192, 192, 0.6)', 
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [reportData]); 

  return (
    <div className="reports-container">
      <h2>Sales Reports</h2>

      <div className="reports-controls">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={handleGenerateReport} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading && !reportData && <p>Loading sales data...</p>}

      {!loading && reportData && (
        <>
          <div className="report-summary-grid">
            <div className="summary-card">
              <h3>Total Revenue</h3>
              <div className="value">${reportData.totalRevenue.toFixed(2)}</div>
            </div>
            <div className="summary-card">
              <h3>Total Orders</h3>
              <div className="value">{reportData.totalOrders}</div>
            </div>
          </div>

          <div className="report-charts-grid">
            <div className="chart-container">
              <h3>Sales by Category</h3>
              {chartConfig ? <Bar data={chartConfig} /> : <p>No data available</p>}
            </div>
            <div className="top-items-container">
              <h3>Top Selling Items</h3>
              <table className="top-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topSellingItems.length > 0 ? (
                    reportData.topSellingItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.menuItemName}</td>
                        <td>{item.quantitySold}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2">No items sold in this period</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;