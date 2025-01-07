const UserModel = require('../models/User.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');

const mongoose = require('mongoose');
const Application = require('../models/Application.model');


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


const get_all_posted_gigs_by_user = async (req, res) => {
    try {
        const id = req.query.id 

        if (!id) {
            return res.status(400).json({ error: "employerId is required" });
        }

        const gigs = await GigModel.find({ employerId: id }).sort({ createdAt: -1 });

        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const get_all_Applicants_by_gig_title = async (req, res) => {
    console.log("get_all_Applicants_by_gig_title invoked");
    try {
      const { title } = req.params; // Access path parameter
      console.log("Gig Title:", title);
  
      if (!title) {
        return res.status(400).json({ error: "Gig Title is required" });
      }
  
      // Find the gig
      const gig = await GigModel.findOne({ title });
      if (!gig) {
        return res.status(404).json({ error: "Gig not found" });
      }
  
      const gigId = gig._id;
  
      // Find applications for the gig
      const applications = await Application.find({ gigId }).sort({ createdAt: -1 }).lean();
  
      // Fetch employee user IDs and add them to applications
      const enrichedApplications = await Promise.all(
        applications.map(async (application) => {
          const employee = await UserModel.findById(application.employeeId);
          return {
            ...application,
            employeeUserId: employee?.userId || "Unknown",
          };
        })
      );
      res.status(200).json(enrichedApplications);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  



module.exports= {
    create_new_gig,
    get_all_posted_gigs_by_user,
    get_all_Applicants_by_gig_title
}

