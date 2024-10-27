import { createSlice } from "@reduxjs/toolkit";
import { menuApiSlice } from "./menuApiSlice";

const initialState = {
    menuItems: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            state.menuItems = action.payload;
        }
    },
});

export const { setMenuItems } = menuSlice.actions;
export default menuSlice.reducer;