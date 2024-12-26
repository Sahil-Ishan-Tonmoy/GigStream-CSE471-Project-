const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String },
  employerId: { type: String, ref: 'User', required: true },
  employeeRoles: [{
    position: { type: String, required: true },
    payment: { type: String, required: true },
  }],
  applicants: [{
    employeeId: { type: String, ref: 'User' },
    status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected'], default: 'Applied' },
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Gig = mongoose.model('Gig', GigSchema);

module.exports = Gig;
