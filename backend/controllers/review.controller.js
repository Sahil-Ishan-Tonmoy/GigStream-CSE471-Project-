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

const get_all_reviews = async (req, res) => {
    try {
      const { id, employeeId } = req.params;
      console.log(req.params);
  
      // Validate parameters
      if (!id || !employeeId) {
        return res.status(400).json({ error: "Reviewer ID and Employee ID are required." });
      }
  
      // Find the recipient's internal `_id` using `userId`
      const recipient = await UserModel.findOne({ userId: employeeId });
      if (!recipient) {
        return res.status(404).json({ error: "Employee not found." });
      }
      const recipientId = recipient._id;
  
      // Fetch reviews
      const reviews = await ReviewModel.find({
        reviewerId: id,
        recipientId: recipientId,
      }).sort({ createdAt: -1 });
      console.log(reviews)
  
      // Send response
      res.status(200).json({
        reviews,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ success: false, message: "Failed to fetch reviews." });
    }
  };
  
  const add_or_update_review = async (req, res) => {
    try {
        console.log("Post Review")
      const { id} = req.params; // Reviewer ID and Employee ID
      const { rating, text,userId } = req.body;
  
      // Validate input
      if (!id || !userId) {
        return res.status(400).json({ error: "Reviewer ID and Employee ID are required." });
      }
      if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Valid rating (1-5) is required." });
      }
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Review text is required." });
      }
  
      // Find the recipient's internal `_id`
      const recipient = await UserModel.findOne({ userId: userId });
      if (!recipient) {
        return res.status(404).json({ error: "Employee not found." });
      }
      const recipientId = recipient._id;
  
      // Check if a review by this reviewer for this recipient already exists
      const existingReview = await ReviewModel.findOne({
        reviewerId: id,
        recipientId: recipientId,
      });
      
  
      let savedReview;
      if (existingReview) {
        // Update the existing review
        existingReview.rating = rating;
        existingReview.feedback = text;
        existingReview.updatedAt = new Date();
        savedReview = await existingReview.save();
      } else {
        // Create a new review
        const newReview = new ReviewModel({
          reviewerId: id,
          recipientId: recipientId,
          rating,
          feedback:text,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        savedReview = await newReview.save();
      }
  
      res.status(200).json({
        success: true,
        message: existingReview ? "Review updated successfully." : "Review added successfully.",
        review: savedReview,
      });
    } catch (error) {
      console.error("Error adding or updating review:", error);
      res.status(500).json({ success: false, message: "Failed to save review." });
    }
  };
  


module.exports= {
    create_new_review,
    get_all_reviews,
    add_or_update_review
}

