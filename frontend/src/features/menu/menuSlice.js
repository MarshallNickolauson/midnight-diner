import { createSlice } from "@reduxjs/toolkit";
import { menuApiSlice } from "./menuApiSlice";

const initialState = {
    menuItems: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                menuApiSlice.endpoints.getMenuItems.matchFulfilled,
                (state, action) => {
                    state.menuItems = action.payload;
                }
            )
            .addMatcher(
                menuApiSlice.endpoints.addMenuItem.matchFulfilled,
                (state, action) => {
                    state.menuItems.push(action.payload);
                }
            )
            .addMatcher(
                menuApiSlice.endpoints.updateMenuItem.matchFulfilled,
                (state, action) => {
                    const index = state.menuItems.findIndex(item => item.id === action.payload._id);
                    if (index !== -1) {
                        state.menuItems[index] = action.payload;
                    }
                }
            )
            .addMatcher(
                menuApiSlice.endpoints.deleteMenuItem.matchFulfilled,
                (state, action) => {
                    state.menuItems = state.menuItems.filter(item => item.id !== action.payload._id);
                }
            )
    }
});

export const {  } = menuSlice.actions;
export default menuSlice.reducer;