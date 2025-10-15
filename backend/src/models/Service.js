import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['plumber', 'painter', 'cleaner', 'carpenter'], required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);


