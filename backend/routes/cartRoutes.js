import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getCart, updateCart } from '../controllers/cartController.js';

router.route('/').get(protect, getCart).put(protect, updateCart);

export default router;