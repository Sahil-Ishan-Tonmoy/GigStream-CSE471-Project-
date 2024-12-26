const UserModel = require("../models/User.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// Temporary OTP storage
let otps = {};

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hospifyconnect@gmail.com",
        pass: "741258963Hospify",
    },
});

// Verify Email Controller
const verifymail = async (req, res) => {
    const { email } = req.body; // Use consistent naming for email
    console.log("Requested email:", email);

    try {
        // Check if email exists in the database
        const matchedUser = await UserModel.findOne({ email: email });
        if (!matchedUser) {
            console.log("Email not found");
            return res.status(404).json({ success: false, message: "Email not found." });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        otps[email] = otp; // Store OTP temporarily

        // Send OTP Email
        transporter.sendMail(
            {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your OTP for Password Reset",
                text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
            },
            (error) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ success: false, message: "Failed to send OTP." });
                }
                res.json({ success: true, message: "OTP sent to your email." });
            }
        );
    } catch (err) {
        console.error("Error verifying email:", err);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Verify OTP Controller
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // Remove OTP after successful verification
        return res.json({ success: true, message: "OTP verified. Proceed to reset password." });
    }

    res.status(400).json({ success: false, message: "Invalid OTP." });
};

module.exports = {
    verifymail,
    verifyOTP,
};
