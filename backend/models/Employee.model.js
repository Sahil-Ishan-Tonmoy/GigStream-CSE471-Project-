const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  gigHistory: [{
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
    position:{ type: String, required: true },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    JoinedAt: { type: Date },
  }],
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
