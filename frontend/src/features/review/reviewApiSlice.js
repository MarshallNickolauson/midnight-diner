import { apiSlice } from '../../api/apiSlice.js';

const REVIEW_URL = '/api/reviews';

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: REVIEW_URL,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useCreateReviewMutation,
} = reviewApiSlice;