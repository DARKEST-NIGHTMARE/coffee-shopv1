import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem } from '../services/apiService';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMenuItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewMenuItem = createAsyncThunk(
  'menu/addNewMenuItem',
  async (menuItemData, { rejectWithValue }) => {
    try {
      const response = await createMenuItem(menuItemData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateExistingMenuItem = createAsyncThunk(
  'menu/updateExistingMenuItem',
  async ({ menuId, menuItemData }, { rejectWithValue }) => {
    try {
      const response = await updateMenuItem(menuId, menuItemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const removeMenuItem = createAsyncThunk(
  'menu/removeMenuItem',
  async (menuId, { rejectWithValue }) => {
    try {
      await deleteMenuItem(menuId);
      return menuId; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const initialState = {
  items: [], 
  status: 'idle', 
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNewMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExistingMenuItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(removeMenuItem.fulfilled, (state, action) => {
        const deletedMenuId = action.payload;
        state.items = state.items.filter((item) => item.id !== deletedMenuId);
      });
  },
});

export default menuSlice.reducer;

export const selectAllMenuItems = (state) => state.menu.items;
export const selectMenuStatus = (state) => state.menu.status;