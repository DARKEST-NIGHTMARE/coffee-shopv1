package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.dto.SalesByCategoryDto;
import com.coffeeshop.coffee_shop_backend.dto.SalesReportDto;
import com.coffeeshop.coffee_shop_backend.dto.TopSellingItemDto;
import com.coffeeshop.coffee_shop_backend.model.OrderStatus;
import com.coffeeshop.coffee_shop_backend.repository.OrderItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.ShopOrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    private final ShopOrderRepository shopOrderRepository;
    private final OrderItemRepository orderItemRepository;

    public ReportService(ShopOrderRepository shopOrderRepository, OrderItemRepository orderItemRepository) {
        this.shopOrderRepository = shopOrderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public SalesReportDto getSalesReport(LocalDateTime startDate, LocalDateTime endDate) {
        BigDecimal totalRevenue = shopOrderRepository.findTotalRevenueByStatusAndDateRange(
                OrderStatus.COMPLETED, startDate, endDate
        );
        Long totalOrders = shopOrderRepository.countByStatusAndCompletedTimestampBetween(
                OrderStatus.COMPLETED, startDate, endDate
        );
        List<TopSellingItemDto> topItems = orderItemRepository.findTopSellingItems(
                OrderStatus.COMPLETED, startDate, endDate
        );
        List<SalesByCategoryDto>salesByCategory =orderItemRepository.findSalesByCategory(
                OrderStatus.COMPLETED, startDate, endDate
        );

        return new SalesReportDto(totalRevenue, totalOrders, topItems, salesByCategory);
    }
}
