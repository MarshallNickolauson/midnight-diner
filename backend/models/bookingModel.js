import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateTime: { type: Date, required: true },
    partySize: { type: Number, required: true },
    specialRequests: { type: String, required: true },
    status: { type: String, default: 'pending' } // pending, confirmed, cancelled
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;