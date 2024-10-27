import { apiSlice } from "../../api/apiSlice";
const MENU_URL = '/api/menu';

export const menuApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: (data) => ({
                url: `${MENU_URL}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetMenuItemsQuery,
} = menuApiSlice;