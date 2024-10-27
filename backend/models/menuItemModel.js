import mongoose from 'mongoose';

const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    ingredients: { type: String },
    imageUrl: { type: String },
    availability: { type: Boolean, default: true },
    prepTime: { type: Number, required: true },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;