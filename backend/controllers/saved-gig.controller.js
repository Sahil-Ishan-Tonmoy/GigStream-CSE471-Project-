const UserModel = require('../models/User.model')
const ApplicationModel = require('../models/Application.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const SavedGigModel = require('../models/SavedGig.model');

const mongoose = require('mongoose')




const create_fav_gig = async (req, res) => {
    try {
        console.log(req.body)
        const { ...savedGigData } = req.body;
        
        const savedGig = new SavedGigModel({ ...savedGigData });  
        
        await savedGig.save();

        res.status(201).json(savedGig); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_savedGigs= async (req, res)=>{
    const savedGigs= await SavedGigModel.find({}).sort({createdAt: -1})
    res.status(200).json(savedGigs)
}


module.exports= {
    create_fav_gig,
    get_savedGigs
}

