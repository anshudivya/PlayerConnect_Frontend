import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #6ab7ff, #fff);
    overflow: hidden;
`;

const SignupCard = styled.div`
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    padding: 30px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    perspective: 1000px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: rotateX(0deg) rotateY(0deg);
    box-sizing: border-box; /* Ensure padding doesn't affect width */
`;

const SignupTitle = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 2em;
    font-weight: 600;
    letter-spacing: -0.02em;
`;

const InputGroup = styled.div`
    margin-bottom: 25px;
    display: flex; /* Use flexbox for label and input alignment */
    flex-direction: column;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    color: #34495e;
    font-weight: 500;
    font-size: 0.95em;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 1em;
    transition: all 0.2s ease;
    background-color: rgba(255, 255, 255, 0.8);
    box-sizing: border-box; /* Ensure padding doesn't affect width */

    &:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const StyledButton = styled.button`
    padding: 12px 25px;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: 500;
    background: linear-gradient(to right, #63b3ed, #3182ce);
    color: white;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    width: 100%;
    border: none;
    cursor: pointer;
    box-sizing: border-box; /* Ensure padding doesn't affect width */

    &:hover {
        background: linear-gradient(to right, #3b82f6, #2563eb);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
`;

const ThreeDSignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleSignup = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Replace with your actual signup API call
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message || 'An error occurred'}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed: ' + error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SignupContainer>
            <SignupCard>
                <SignupTitle>Sign Up</SignupTitle>
                <InputGroup>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledInput
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                </InputGroup>
                <InputGroup>
                    <StyledLabel htmlFor="username">Username</StyledLabel>
                    <StyledInput
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                </InputGroup>
                <InputGroup>
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <StyledInput
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                </InputGroup>
                <ButtonGroup>
                    <StyledButton
                        onClick={handleSignup}
                        disabled={isSubmitting}
                        className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                    >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </StyledButton>
                </ButtonGroup>
            </SignupCard>
        </SignupContainer>
    );
};

export default ThreeDSignupForm;
