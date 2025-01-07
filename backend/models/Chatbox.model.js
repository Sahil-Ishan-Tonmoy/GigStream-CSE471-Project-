const mongoose = require('mongoose');

const ChatboxSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
});

const Chatbox = mongoose.model('Chatbox', ChatboxSchema);

module.exports = Chatbox;
