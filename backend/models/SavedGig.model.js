const mongoose = require('mongoose');

const SavedGigSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  createdAt: { type: Date, default: Date.now }
});

const SavedGig = mongoose.model('SavedGig', SavedGigSchema);

module.exports = SavedGig;
