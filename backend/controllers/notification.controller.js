const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');

const mongoose = require('mongoose');
const Application = require('../models/Application.model');
const NotificationModel = require('../models/Notification.model');


const get_all_notification= async (req, res) => {
    try {
        const{id}= req.params
        console.log(id)
        const notifications= await NotificationModel.find({userId:(id)}).sort({ createdAt: -1 });
        console.log(notifications)

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const delete_notification= async (req, res) => {
    try {
        const{nid}= req.params
        console.log(nid)
        const notification= await NotificationModel.findOneAndDelete({_id:(nid)})


        res.status(200).json({mssg:"Deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports= {
    get_all_notification,
    delete_notification
}

