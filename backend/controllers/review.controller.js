const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');
const ReviewModel= require('../models/Review.model');

const mongoose = require('mongoose')


const create_new_review= async (req, res) => {
    try {
        console.log(req.body)
        const { ...reviewData } = req.body;
        
        const review = new ReviewModel({ ...reviewData });  
        
        await review.save();

        res.status(201).json(review); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_all_reviews= async (req, res)=>{
    const reviews= await ReviewModel.find({}).sort({createdAt: -1})
    res.status(200).json(reviews)
}


module.exports= {
    create_new_review,
    get_all_reviews
}

