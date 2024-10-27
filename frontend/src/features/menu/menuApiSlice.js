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
        addMenuItem: builder.mutation({
            query: (data) => ({
                url: `${MENU_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        updateMenuItem: builder.mutation({
            query: (data) => ({
                url: `${MENU_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
        }),
    }),
});

export const {
    useGetMenuItemsQuery,
    useAddMenuItemMutation,
    useUpdateMenuItemMutation,
} = menuApiSlice;