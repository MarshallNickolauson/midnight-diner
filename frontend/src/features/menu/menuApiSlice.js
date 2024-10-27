import { apiSlice } from "../../api/apiSlice";
const MENU_URL = '/api/menu';

export const menuApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: (data) => ({
                url: `${MENU_URL}`,
                method: 'GET',
            }),
            providesTags: ['Menu'],
        }),
        addMenuItem: builder.mutation({
            query: (data) => ({
                url: `${MENU_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Menu'],
        }),
        updateMenuItem: builder.mutation({
            query: (data) => ({
                url: `${MENU_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Menu'],
        }),
        deleteMenuItem: builder.mutation({
            query: (data) => ({
                url: `${MENU_URL}/${data._id}`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Menu'],
        }),
    }),
});

export const {
    useGetMenuItemsQuery,
    useAddMenuItemMutation,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
} = menuApiSlice;