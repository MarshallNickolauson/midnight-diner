import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice.js';
import authReducer from './features/auth/authSlice.js';
import menuReducer from './features/menu/menuSlice.js';
import cartReducer from './features/cart/cartSlice.js';
import reviewReducer from './features/review/reviewSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        cart: cartReducer,
        review: reviewReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;
