import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../static/GigStream Logo.png"

const LandingPageNavbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-logo">
                <Link to="/login" className="logo">
                <img src={logo} alt="GigStream Logo" style={{ height: "50px" }} />
                </Link>
                </div>
                <nav>
                    <a href="/about-us">About Us</a>
                    <a href="/login">Login</a> 
                </nav>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div style={{
            backgroundImage: 'url("IMG_2770.webp")', // Dummy image URL
            backgroundSize: 'cover', // Cover the entire page
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh', // Minimum height to cover the full viewport height
            color: 'white' // Text color for visibility against darker backgrounds
        }}>
            <LandingPageNavbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Welcome to Our Website</h2>
                <p2>This is the homepage. You can find more about us or sign in to access exclusive features.</p2>
            </div>
        </div>
    );
};

export default LandingPage;
