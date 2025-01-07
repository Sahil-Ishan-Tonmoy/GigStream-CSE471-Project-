const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  roleApplied: { type: String, required: true },
  cvAttachment: { type: String, required: true },
  whyJoin: { type: String, required: true },
  whatCanOffer: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
