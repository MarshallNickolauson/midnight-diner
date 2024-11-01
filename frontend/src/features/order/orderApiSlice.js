import { apiSlice } from "../../api/apiSlice";

const ORDER_URL = 'http://localhost:5000/api/orders';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.mutation({
            query: (data) => ({
                url: `${ORDER_URL}/${data.email}`,
                method: 'GET'
            }),
        }),
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
    useGetOrdersMutation,
    useCreateOrderMutation,
} = orderApiSlice;