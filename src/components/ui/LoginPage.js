import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const DarkSection = styled.div`
    width: 50%;
    background: linear-gradient(135deg, #1a237e, #0d47a1);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
`;

const Quote = styled.p`
    font-size: 1.8em;
    font-style: italic;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const FormSection = styled.div`
    width: 50%;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    animation: ${fadeIn} 0.8s ease-out;
`;

const LoginFormContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    width: 350px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const LoginTitle = styled.h2`
    text-align: center;
    margin-bottom: 25px;
    color: #333;
    font-size: 2em;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 1em;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LoginButton = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    background: linear-gradient(to right, #007bff, #2962ff);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(to right, #0056b3, #1e40af);
    }
`;

const CloseButton = styled.button`
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    background-color: #f0f0f0;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;

function LoginPage({ onSignInButtonVisibility }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                onSignInButtonVisibility(false); // Hide
                navigate('/');
            } else if (response.status === 404) {
                navigate('/signup');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    const handleClose = () => {
        onSignInButtonVisibility(true); // Show
        navigate('/');
    };

    return (
        <LoginContainer>
            <DarkSection>
                <Quote>“The only way to prove that you’re a good sport is to lose.” – Ernie Banks</Quote>
            </DarkSection>
            <FormSection>
                <LoginFormContent>
                    <LoginTitle>Login</LoginTitle>
                    <InputGroup>
                        <Label>Username</Label>
                        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                    <ButtonGroup>
                        <LoginButton onClick={handleLogin}>Login</LoginButton>
                        <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ButtonGroup>
                </LoginFormContent>
            </FormSection>
        </LoginContainer>
    );
}


export default LoginPage;