import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    items: [{
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // pending, complated, cancelled
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;