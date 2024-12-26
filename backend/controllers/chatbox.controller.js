const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');
const ChatboxModel= require('../models/Chatbox.model');

const mongoose = require('mongoose')


const create_new_Message= async (req, res) => {
    try {
        console.log(req.body)
        const { ...MessageData } = req.body;
        
        const Message = new ChatboxModel({ ...MessageData });  
        
        await Message.save();

        res.status(201).json(Message); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_all_Messages= async (req, res)=>{
    const Messages= await ChatboxModel.find({}).sort({createdAt: -1})
    res.status(200).json(Messages)
}


module.exports= {
    create_new_Message,
    get_all_Messages
}

