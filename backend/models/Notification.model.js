const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    notification: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,  
    },
    role: {
        type: String,
        enum: ['Employee', 'Employer'],  
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,  
    },
});


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
