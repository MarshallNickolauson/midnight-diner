import { apiSlice } from "../../api/apiSlice";

const CART_URL = '/api/cart';

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateCart: builder.mutation({
            query: ({ menuItemId, action }) => ({
                url: CART_URL,
                method: 'PUT',
                body: { menuItemId, action },
                credentials: 'include',
            }),
        }),
        deleteCartItem: builder.mutation({
            query: ({ menuItemId }) => ({
                url: `${CART_URL}/${menuItemId}`,
                method: 'DELETE',
                credentials: 'include',
            })
        }),
    }),
});

export const {
    useUpdateCartMutation,
    useDeleteCartItemMutation,
} = cartApiSlice;