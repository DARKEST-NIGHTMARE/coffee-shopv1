import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveOrders, createOrder, updateOrderStatus } from '../services/apiService';

export const fetchActiveOrders = createAsyncThunk(
  'orders/fetchActiveOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActiveOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const placeNewOrder = createAsyncThunk(
  'orders/placeNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  activeOrders: [],
  status: 'idle', 
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeOrders = action.payload;
      })
      .addCase(fetchActiveOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.activeOrders.unshift(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        
        if (updatedOrder.status === 'COMPLETED' || updatedOrder.status === 'CANCELLED') {
          state.activeOrders = state.activeOrders.filter(
            (order) => order.id !== updatedOrder.id
          );
        } else {
          const index = state.activeOrders.findIndex((order) => order.id === updatedOrder.id);
          if (index !== -1) {
            state.activeOrders[index] = updatedOrder;
          }
        }
      });
  },
});

export default orderSlice.reducer;

export const selectActiveOrders = (state) => state.orders.activeOrders;