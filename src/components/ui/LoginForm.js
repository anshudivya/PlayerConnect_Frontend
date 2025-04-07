import React, { useState } from 'react';


function LoginForm({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setEmailError(''); // Clear error on input change
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (!validateEmail(username)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Implement your login logic here
        console.log('Logging in with:', username, password);
        onClose(); // Close the modal
    };

    return (
        <div className="login-modal">
            <div className="login-modal-content">
                <h2 className="login-title">Login</h2>
                <div className="input-group">
                    <label htmlFor="username">Username/Email</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username or email"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="button-group">
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;