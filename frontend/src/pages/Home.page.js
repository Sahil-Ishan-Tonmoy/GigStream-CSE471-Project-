import React from 'react';


const HomePage = () => {
    return (
        <div style={{
            backgroundImage: 'url("IMG_2770.webp")', // Dummy image URL
            backgroundSize: 'cover', // Cover the entire page
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh', // Minimum height to cover the full viewport height
            color: 'white' // Text color for visibility against darker backgrounds
        }}>
            
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Welcome to Our Website</h2>
                <p2>This is the homepage. You can find more about us or sign in to access exclusive features.</p2>
            </div>
        </div>
    );
};

export default HomePage;
