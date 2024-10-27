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
    }
});

export const { setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;