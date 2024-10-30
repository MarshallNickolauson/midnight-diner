import expressAsyncHandler from "express-async-handler";
import Review from '../models/reviewModel.js';

// @desc    Get all reviews
// @route   GET api/reviews
// @access  Public
export const getAllReviews = expressAsyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    res.json(reviews);
});

// @desc    Get single review
// @route   GET api/reviews/:id
// @access  Public
export const getReviewById = expressAsyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        res.json(review);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Create review
// @route   POST api/reviews
// @access  Private - Logged in users only (req.user)
export const createReview = expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = new Review({
        user: req.user._id,
        name: req.user.name,
        rating,
        comment,
    });
    const createdReview = await review.save();
    res.status(201).json(createdReview);
});

// @desc    Update review
// @route   PUT api/reviews/:id
// @access  Private
export const updateReview = expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);
    if (review) {
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Delete review
// @route   DELETE api/reviews
// @access  Private
export const deleteReview = expressAsyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
        await review.remove();
        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});