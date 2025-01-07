const UserModel = require('../models/User.model')
const ApplicationModel = require('../models/Application.model')
const EmployeeModel = require('../models/Employee.model');
const EmployerModel = require('../models/Employer.model');
const GigModel = require('../models/Gig.model');
const NotificationModel = require('../models/Notification.model');

const mongoose = require('mongoose');
const { application } = require('express');
const Gig = require('../models/Gig.model');


const check = async (req, res) => {
    console.log("Check Invoked");
    try {
        const { title, id, position } = req.params;
        const employeeId = id;

        // Find the gig by title
        const gig = await GigModel.findOne({ title });
        if (!gig) {
            return res.status(404).json({ error: "Gig not found." });
        }

        // Check if the applicant already exists
        const isApplicantExisting = gig.applicants.some(applicant => 
            applicant.employeeId === employeeId && applicant.position === position
        );

        if (isApplicantExisting) {
            console.log("Old application detected");
            const mssg = "You already applied for this position";
            return res.status(409).json({ message: mssg }); // Use 409 Conflict for duplicate applications
        }

        console.log("New application allowed");
        return res.status(200).json({ message: "You can apply for this position." });

    } catch (error) {
        console.error("Error during check:", error.message);
        return res.status(500).json({ error: error.message }); // 500 for server errors
    }
};

const get_position= async (req, res) => {
    console.log("Check Invoked");
    try {
        const { title, id, aid } = req.params;
        const employeeId = id;

        // Find the gig by title
        const position = await ApplicationModel.findOne({ _id:aid });
        if (!position) {
            return res.status(404).json({ error: "Gig not found." });
        }

        return res.status(200).json(position);

    } catch (error) {
        console.error("Error during check:", error.message);
        return res.status(500).json({ error: error.message }); // 500 for server errors
    }
};



 const create_application= async (req, res) => {
    try {
        const { id, title, position, whyJoin, whatCanOffer } = req.body;


        
        const employeeId = id;

        const gig = await GigModel.findOne({ title });
        if (!gig) {
            return res.status(404).json({ error: "Gig not found." });
        }

        if (gig.applicants.some(applicant => 
            applicant.employeeId === employeeId && applicant.position === position
        )) {
            const mssg = "An applicant with this employeeId and position already exists.";
            res.status(220).json(mssg)
        }

        console.log(gig.applicants)
        gig.applicants.push({ employeeId,position, status: "Pending" });
        console.log(gig.applicants)
        await gig.save();
        console.log(gig)

        const { _id: gigId, employerId } = gig;

        const applicationData = {
            employeeId,
            employerId,
            gigId,
            roleApplied: position,
            cvAttachment: req.file.path, // Save the file path
            whyJoin,
            whatCanOffer,
        };

        const application = new ApplicationModel(applicationData);
        await application.save();

        const employee= await UserModel.findOne({_id:employeeId})
        const notification= `${employee.userId} has applied for the position ${position} in gig ${title}`
        const Notification= new NotificationModel({
            notification,
            role: "Employer",
            userId: employerId
            
        })
        await Notification.save()

        res.status(201).json(application, );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const get_application_Details = async (req, res) => {
    try {
        const { applicationId } = req.params;

        
        const application = await ApplicationModel.findById(applicationId);

        
        if (!application) {
            return res.status(404).json({ error: "Application not found." });
        }

        
        const gig = await GigModel.findById(application.gigId);
        const employee = await UserModel.findById(application.employeeId);

        
        if (!gig || !employee) {
            return res.status(404).json({ error: "Gig or Employee not found." });
        }

        
        const enrichedApplication = {
            ...application.toObject(),  
            gig_title: gig.title || "Unknown", 
            employee_userId: employee.userId || "Unknown",
            employee_name: `${employee.firstName} ${employee.lastName}` || "Unknown", 
            employee_email: employee.email || "Unknown", 
        };

        
        
        res.status(200).json(enrichedApplication);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

const update_status = async (req, res) => {
    console.log("Update Status");

    console.log(req.params)

    const { status, title, userId } = req.body;
    const { role, id , aid} = req.params; // Employer ID

    try {
        const gig = await GigModel.findOne({ title });
        const employee = await UserModel.findOne({ userId });
        const application = await ApplicationModel.findById(aid)

        if (!gig) {
            return res.status(404).json({ error: "Gig not found." });
        }

        if (!employee) {
            return res.status(404).json({ error: "Employee not found." });
        }

        const employeeId = employee._id.toString();
        const member = await UserModel.findOne({ userId });
            if (!member) {
                return res.status(404).json({ error: "Member not found." });
            }

        // Find the specific applicant within the applicants array
        let notification;
        if (status === "Accepted") {
            console.log("Accepted Hit");

            

            const joining = {
                gigId: gig._id,
                employerId: id,
                position: application.roleApplied,
                JoinedAt: new Date(),
            };

            const selectedEmployee = {
                employeeId,
                position: application.roleApplied,
                JoinedAt: new Date(),
            };

            // Update employee's gig history and gig's selected employee list
            member.gigHistory.push(joining);
            gig.selected_employee.push(selectedEmployee);

            await member.save();
            await gig.save();

            notification = `You have been Accepted for the position ${application.roleApplied} in the gig titled ${gig.title}`;
        } else if (status === "Rejected") {
            console.log("Rejected Hit");
            console.log(application)

            notification = `You have been Rejected for the position ${application.roleApplied} in the gig titled ${gig.title}`;
        }

        // Remove applicant from the gig's applicants array
        gig.applicants = gig.applicants.filter((applicant) => {
            const isMatch =
                applicant.employeeId === employeeId &&
                applicant.position === application.roleApplied;
            if (isMatch) {
                console.log("Removing applicant:", applicant);
            }
            return !isMatch; // Keep applicants that don't match
        });
        
        await gig.save();
        

        // Delete the application from the database
        await ApplicationModel.findOneAndDelete({
            employeeId,
            gigId: gig._id,
            roleApplied: application.roleApplied,
        });

        console.log(notification);
        const Notification= new NotificationModel({
            notification,
            role: "Employee",
            userId: member._id
            
        })
        await Notification.save()

        // Respond with success and notification message
        res.status(200).json({notification });
    } catch (error) {
        console.error("Error in update_status:", error.message);
        res.status(500).json({ error: error.message });
    }
};






module.exports= {
    check,
    get_position,
    create_application,
    get_application_Details,
    update_status
}

