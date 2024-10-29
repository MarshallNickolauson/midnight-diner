import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    menuItems: localStorage.getItem('midnightDinerCustomerCart')
        ? JSON.parse(localStorage.getItem('midnightDinerCustomerCart'))
        : [],
    loading: false,
    error: null,
};

export const getUserCart = createAsyncThunk('cart/getUserCart', async () => {
    const response = await axios.get('/api/cart', { withCredentials: true });
    return response.data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const menuItem = action.payload;
            const existingItem = state.menuItems.find(item => item._id === menuItem._id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.menuItems.push({ ...menuItem, quantity: 1 });
            }

            localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(state.menuItems));
        },
        removeItemFromCart: (state, action) => {
            const menuItem = action.payload;
            const existingItem = state.menuItems.find(item => item._id === menuItem._id);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                } else {
                    state.menuItems = state.menuItems.filter(item => item._id !== menuItemId);
                }
            }

            localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(state.menuItems));
        },
        clearSpecificItemFromCart: (state, action) => {
            const menuItem = action.payload;
            state.menuItems = state.menuItems.filter(item => item._id !== menuItem._id);

            localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(state.menuItems));
        },
        clearCart: (state) => {
            state.menuItems = [];
            localStorage.removeItem('midnightDinerCustomerCart');
        },
        setCartItems: (state, action) => {
            state.menuItems = action.payload;
            localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.loading = false;

                state.menuItems = action.payload.items.map(cartItem => ({
                    _id: cartItem.menuItem._id,
                    name: cartItem.menuItem.name,
                    description: cartItem.menuItem.description,
                    price: cartItem.menuItem.price,
                    salePrice: cartItem.menuItem.salePrice,
                    category: cartItem.menuItem.category,
                    ingredients: cartItem.menuItem.ingredients,
                    imageUrl: cartItem.menuItem.imageUrl,
                    availability: cartItem.menuItem.availability,
                    prepTime: cartItem.menuItem.prepTime,
                    featured: cartItem.menuItem.featured,
                    updatedAt: cartItem.menuItem.updatedAt,
                    quantity: cartItem.quantity
                }));

                localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(action.payload.items));
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    clearSpecificItemFromCart,
    clearCart,
    setCartItems
} = cartSlice.actions;

export default cartSlice.reducer;