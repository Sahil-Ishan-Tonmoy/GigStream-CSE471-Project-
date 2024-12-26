import { useState } from 'react';
import '../css/Login.css'; // Include the CSS styles

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                window.location.href = `http://localhost:3000/home/${data.role}/${data.userId}`;
            } else {
                const error = await response.json();
                console.error("Login failed:", error.message);
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form className="login-form">
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Username/Password?</a>
                    </div>
                    <div className="submit-button">
                        <button type="button" onClick={handleLogin}>Sign In</button>
                    </div>
                    <div className="signup-link">
                        <span>Don’t have an account?</span>
                        <a href="/signup">Sign up now</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
