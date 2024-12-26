const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  gigHistory: [{
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: { type: Date },
  }],
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
