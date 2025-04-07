import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationContainer = styled.div`
    padding: 40px;
    background: linear-gradient(135deg, #e0f7fa 0%, #cce0f5 50%, #d1c4e9 100%);
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    max-width: 800px;
    margin: 40px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ConfirmationDetails = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    p {
        margin-bottom: 15px;
        font-size: 1.1em;
    }
    h2 {
        margin-bottom: 20px;
        color: #007bff;
    }
`;

const PayButton = styled.button`
    padding: 14px 24px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #218838;
    }
    margin-top:20px;
`;

function ConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { venueName, venueAddress, sport, date, time, totalAmount } = location.state || {};

    const handlePayNow = () => {
        // Implement payment gateway integration here
        // For now, just navigate to a dummy payment page
        navigate('/payment');
    };

    return (
        <ConfirmationContainer>
            <ConfirmationDetails>
                <h2>Booking Confirmation</h2>
                {location.state ? (
                    <>
                        <p><strong>Venue:</strong> {venueName}</p>
                        <p><strong>Address:</strong> {venueAddress}</p>
                        <p><strong>Sport:</strong> {sport}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {time}</p>
                        <p><strong>Total Amount:</strong> ₹{totalAmount}</p> {/* Corrected Line */}
                        <PayButton onClick={handlePayNow}>Pay Now</PayButton>
                    </>
                ) : (
                    <p>Booking details not found.</p>
                )}
            </ConfirmationDetails>
        </ConfirmationContainer>
    );
}

export default ConfirmationPage;