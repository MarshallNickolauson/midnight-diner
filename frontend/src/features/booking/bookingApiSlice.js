import { apiSlice } from "../../api/apiSlice";

const BOOKING_URL = '/api/booking';

export const bookingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.mutation({
            query: (data) => ({
                url: `${BOOKING_URL}/${data.email}`,
                method: 'GET',
            }),
        }),
        createBooking: builder.mutation({
            query: (data) => ({
                url: BOOKING_URL,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetBookingsMutation,
    useCreateBookingMutation,
} = bookingApiSlice;