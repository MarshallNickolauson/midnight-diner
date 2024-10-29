import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;