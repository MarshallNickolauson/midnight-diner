import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: 'active' }, // active, submitted, abandoned
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;