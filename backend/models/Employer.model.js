const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
});

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;
