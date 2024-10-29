import mongoose from 'mongoose';
import MenuItem from './menuItemModel.js';

const Schema = mongoose.Schema;

const cartSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menuItem: MenuItem.schema,
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;