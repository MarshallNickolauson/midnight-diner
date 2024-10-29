import expressAsyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";

// @desc    Get all reservations
// @route   GET api/booking
// @access  Public
export const getAllBookings = expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({});
    res.json(bookings);
});

// @desc    Get single reservation
// @route   GET api/booking/:id
// @access  Public
export const getBookingById = expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        res.json(booking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
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