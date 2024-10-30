import { apiSlice } from '../../api/apiSlice.js';

const REVIEW_URL = '/api/reviews';

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: (data) => ({
                url: REVIEW_URL,
                method: 'GET',
            }),
            providesTags: ['Review'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: REVIEW_URL,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
} = reviewApiSlice;