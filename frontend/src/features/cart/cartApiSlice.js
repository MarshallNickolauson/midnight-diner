import { apiSlice } from "../../api/apiSlice";

const CART_URL = '/api/cart';

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserCart: builder.query({
            query: (data) => ({
                url: CART_URL,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        updateCart: builder.mutation({
            query: ({ menuItemId, action }) => ({
                url: CART_URL,
                method: 'PUT',
                body: { menuItemId, action },
            }),
        }),
    }),
});

export const { 
    useGetUserCartQuery,
    useUpdateCartMutation,
} = cartApiSlice;