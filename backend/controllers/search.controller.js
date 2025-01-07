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
    res.status(200).json(users)
}


const get_all_gigs= async (req, res)=>{
    const Gigs= await GigModel.find({}).sort({createdAt: -1})
    res.status(200).json(Gigs)
}


//get single user
const get_EmployeeDetails= async (req, res)=>{
    console.log('get EmployeeDetails invoked')
    const { employeeId } = req.params
    console.log(employeeId)

    const user= await UserModel.findOne({
        userId: employeeId
    });
    if (!user){
        return  res.status(400).json({error: 'No such User'})
    }
    res.status(200).json(user)
}

const get_GigDetails= async (req, res)=>{
    console.log('get GigDetails invoked')
    const { title } = req.params
    console.log(title)

    const gig= await GigModel.findOne({
        title: title
    });
    if (!gig){
        return  res.status(400).json({error: 'No such Gig'})
    }
    res.status(200).json(gig)
}

module.exports= {
    get_all_employees,
    get_all_gigs,
    get_EmployeeDetails,
    get_GigDetails
}

