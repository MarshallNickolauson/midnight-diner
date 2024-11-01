import express from 'express';
const router = express.Router();
import { createOrder, deleteOrder, getOrders } from '../controllers/orderController.js';

router.route('/').post(createOrder);
router.route('/:email').get(getOrders);
router.route('/:id').delete(deleteOrder);

export default router;