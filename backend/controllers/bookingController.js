import expressAsyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";

// @desc    Get all reservations
// @route   GET api/booking/:email
// @access  Public
export const getAllBookings = expressAsyncHandler(async (req, res) => {
    if (!req.params.email) return res.status(400).json({ message: 'No email was sent through request params /api/booking/:email' });
    const bookings = await Booking.find({ email: req.params.email });
    res.status(200).json(bookings);
});

// @desc    Create reservation
// @route   POST api/booking
// @access  Public
export const createBooking = expressAsyncHandler(async (req, res) => {
    const { name, email, phone, dateTime, partySize, specialRequests } = req.body;
    const booking = new Booking({
        name,
        email,
        phone,
        dateTime,
        partySize,
        specialRequests,
    });
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
});

// @desc    Update reservation
// @route   PUT api/reviews/:id
// @access  Private - email and phone should match
export const updateBooking = expressAsyncHandler(async (req, res) => {
    const { email, phone, dateTime, partySize, specialRequests, status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking && booking.email === email && booking.phone === phone) {
        booking.dateTime = dateTime || booking.dateTime;
        booking.partySize = partySize || booking.partySize;
        booking.specialRequests = specialRequests || booking.specialRequests;
        booking.status = status || booking.status;

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(401);
        throw new Error('Booking not found or credentials do not match');
    }
});

// @desc    Delete reservation
// @route   DELETE api/reviews/:id
// @access  Private - email and phone should match
export const deleteBooking = expressAsyncHandler(async (req, res) => {
    const { email, phone } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking && booking.email === email && booking.phone === phone) {
        await booking.remove();
        res.json({ message: 'Booking removed' });
    } else {
        res.status(401);
        throw new Error('Booking not found or credentials do not match');
    }
});