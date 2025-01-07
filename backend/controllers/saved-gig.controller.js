const UserModel = require('../models/User.model')
const ApplicationModel = require('../models/Application.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');
const SavedGigModel = require('../models/SavedGig.model');

const mongoose = require('mongoose')




const create_fav_gig = async (req, res) => {
    try {
      console.log("Favourite initiated");
  
      const { gigId, id, status } = req.params;
  
      // Find an existing saved gig by gigId and userId
      let savedGig = await SavedGigModel.findOne({ gigId: gigId, userId: id });
  
      if (!savedGig) {
        // If no saved gig found, create a new one
        savedGig = new SavedGigModel({ gigId, userId: id, status });
        await savedGig.save();
      } else {
        // If a saved gig is found, update the status
        savedGig.status = status;
        await savedGig.save();
      }
  
      res.status(201).json(savedGig);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const get_savedGigs = async (req, res) => {
    const { id } = req.params;
    try {
      // Find all saved gigs for a specific user
      const savedGigs = await SavedGigModel.find({ userId: id , status:true}).sort({ createdAt: -1 });
  
      // Fetch the full details for each gig using the gigId
      const fullGigs = await Promise.all(savedGigs.map(async (savedGig) => {
        const gigDetails = await GigModel.findById(savedGig.gigId)
        return gigDetails; // Return the full gig details
      }));
  
      // Respond with the full gig details in an array
      
      res.status(200).json(fullGigs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

const is_saved= async (req, res) => {
    console.log("is fav initiated")

    try {
      const { gigId, id:userId } = req.params;
      
  
      // Find the saved gig entry for the user and gig
      const savedGig = await SavedGigModel.findOne({ gigId: gigId, userId: userId });
  
      if (savedGig) {
        // If found, return the saved gig status
        return res.status(200).json({ status: savedGig.status });
      } else {
        // If not found, the gig is not saved by the user
        return res.status(404).json({ status: false });
      }
    } catch (error) {
      console.error("Error fetching saved gig status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports= {
    create_fav_gig,
    get_savedGigs,
    is_saved
}

