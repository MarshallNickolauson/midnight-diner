import express from 'express';
const router = express.Router();
import { protect, fetchUserOrElseNull } from '../middleware/authMiddleware.js';
import { createOrder, deleteOrder, getOrders, getSingleOrder } from '../controllers/orderController.js';

router.route('/').get(fetchUserOrElseNull, getOrders).post(fetchUserOrElseNull, createOrder);
router.route('/:id').get(fetchUserOrElseNull, getSingleOrder).delete(fetchUserOrElseNull, deleteOrder);

export default router;