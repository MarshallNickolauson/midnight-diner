import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { deleteCartItem, getCart, updateCart } from '../controllers/cartController.js';

router.route('/').get(protect, getCart).put(protect, updateCart);
router.route('/:menuItemId').delete(protect, deleteCartItem);

export default router;