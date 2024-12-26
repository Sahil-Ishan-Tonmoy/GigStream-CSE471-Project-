const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');

const mongoose = require('mongoose')


const create_new_gig= async (req, res) => {
    try {
        console.log(req.body)
        const {...gigData } = req.body;

        const gig = new GigModel({ ...gigData });
        
        console.log(gig)
        
        await gig.save();

        res.status(201).json(gig); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_all_gigs= async (req, res)=>{
    const Gigs= await GigModel.find({}).sort({createdAt: -1})
    res.status(200).json(Gigs)
}


module.exports= {
    create_new_gig,
    get_all_gigs
}

