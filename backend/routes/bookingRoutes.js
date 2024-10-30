import express from 'express';
import { createBooking, deleteBooking, getAllBookings, updateBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.route('/').post(createBooking);
router.route('/:id').put(updateBooking).delete(deleteBooking);
router.route('/:email').get(getAllBookings);

export default router;