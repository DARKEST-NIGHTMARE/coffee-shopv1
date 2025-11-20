import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import menuReducer from './features/menuSlice';
import orderReducer from './features/orderSlice';
import inventoryReducer from './features/inventorySlice';
export const store = configureStore({
    reducer:{
        auth:authReducer,
        menu:menuReducer,
        orders:orderReducer,
        inventory: inventoryReducer,

    },
});