import { apiSlice } from "../../api/apiSlice";

const ORDER_URL = '/api/orders';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDER_URL,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { 
    useCreateOrderMutation,
} = orderApiSlice;