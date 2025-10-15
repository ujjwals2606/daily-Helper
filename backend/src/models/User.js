import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'seeker', 'admin'], default: 'user' },
    verified: { type: Boolean, default: false },
    otp: { type: String },
    points: { type: Number, default: 0 },
    feedbacks: [feedbackSchema],
    googleId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);


