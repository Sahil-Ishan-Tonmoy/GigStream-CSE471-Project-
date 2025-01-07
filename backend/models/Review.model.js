const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: false },
  feedback: { type: String },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
