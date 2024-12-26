const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');

const mongoose = require('mongoose')


const get_all_employees= async (req, res)=>{
    const employees= await EmployeeModel.find({}).sort({createdAt: -1})
    
    let users=[]
    for(let i=0; i<employees.length;i++){
        const user= await UserModel.findOne({userId : employees[i].userId})
        users.push(user)
    }
    console.log(users)
    res.status(200).json(users)
}

const get_all_gigs= async (req, res)=>{
    const Gigs= await GigModel.find({}).sort({createdAt: -1})
    res.status(200).json(Gigs)
}


module.exports= {
    get_all_employees,
    get_all_gigs
}

