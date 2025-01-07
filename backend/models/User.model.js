const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true, // Ensures email is saved in lowercase
    trim: true,      // Trims whitespace
  },
  phone: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  gender: {
    type: String,
    required: [true, "Please enter your gender"],
    enum: ['Male', 'Female', 'Other'],
},
  skills: { type: [String] },
  role: { type: String, enum: ['Employee', 'Employer'], required: true },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
