const UserModel = require('../models/User.model')
const ApplicationModel = require('../models/Application.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');

const mongoose = require('mongoose')




const create_application= async (req, res) => {
    try {
        console.log(req.body)
        const { ...applicationData } = req.body;
        
        const application = new ApplicationModel({ ...applicationData });  
        
        await application.save();

        res.status(201).json(application); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_applications_by_gig= async (req, res)=>{
    const { gig_id } = req.params
    const applications= await ApplicationModel.find({gigId:gig_id}).sort({createdAt: -1})
    res.status(200).json(applications)
}


module.exports= {
    create_application,
    get_applications_by_gig
}

