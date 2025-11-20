import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInventoryItems,
  addInventoryItem,
  updateInventoryStock,
} from "../services/apiService";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getInventoryItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewInventoryItem = createAsyncThunk(
  'inventory/addNewInventoryItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await addInventoryItem(itemData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStock = createAsyncThunk(
  'inventory/updateStock',
  async ({ itemId, changeQuantity }, { rejectWithValue }) => {
    try {
      const response = await updateInventoryStock(itemId, changeQuantity);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNewInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload); 
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      });
  },
});

export default inventorySlice.reducer;

export const selectAllInventoryItems = (state) => state.inventory.items;
export const selectInventoryStatus = (state) => state.inventory.status;
