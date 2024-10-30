import { createSlice } from "@reduxjs/toolkit";
import { reviewApiSlice } from "./reviewApiSlice";

const initialState = {
    reviews: [],
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                reviewApiSlice.endpoints.getReviews.matchFulfilled,
                (state, action) => {
                    state.reviews = action.payload;
                }
            )
            .addMatcher(
                reviewApiSlice.endpoints.createReview.matchFulfilled,
                (state, action) => {
                    if (state.reviews.length >= 15) {
                        state.reviews.shift();
                    }

                    state.reviews.push(action.payload);
                }
            )
    },
});

export const { } = reviewSlice.actions;
export default reviewSlice.reducer;