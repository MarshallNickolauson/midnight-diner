import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

const review = mongoose.model('Review', reviewSchema);

export default review;