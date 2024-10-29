import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controllers/reviewController.js';

router.route('/').get(getAllReviews).post(protect, createReview);
router.route('/:id').get(getReviewById).put(protect, updateReview).delete(protect, deleteReview);

export default router;