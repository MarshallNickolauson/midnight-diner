import express from 'express';
const router = express.Router();
import { fetchUserOrElseNull } from '../middleware/authMiddleware.js';
import { createOrder, deleteOrder, getOrders } from '../controllers/orderController.js';

router.route('/').get(fetchUserOrElseNull, getOrders).post(fetchUserOrElseNull, createOrder);
router.route('/:id').delete(deleteOrder); // Only available to employee or admin

export default router;