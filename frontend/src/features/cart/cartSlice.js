import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItems: localStorage.getItem('midnightDinerCustomerCart') ? JSON.parse(localStorage.getItem('midnightDinerCustomerCart')) : [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const menuItem = action.payload;
            const existingItem = state.menuItems.find(item => item._id === menuItem._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.menuItems.push({ ...menuItem, quantity: 1 });
            }

            localStorage.setItem('midnightDinerCustomerCart', JSON.stringify(state.menuItems));
        },
        removeItemFromCart: (state, action) => {
            const menuItemId = action.payload;
            const existingItem = state.menuItems.find(item => item._id === menuItemId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.menuItems = state.menuItems.filter(item => item._id !== menuItemId);
                }
            }

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
    }
});

export const { addItemToCart, removeItemFromCart, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;