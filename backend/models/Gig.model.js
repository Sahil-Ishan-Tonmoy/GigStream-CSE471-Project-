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
    position:{ type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  }],
  selected_employee: [{
    employeeId: { type: String, ref: 'User' },
    position: { type: String, required: true },
    JoinedAt: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Gig = mongoose.model('Gig', GigSchema);

module.exports = Gig;
