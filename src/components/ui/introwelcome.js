import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FeaturedVenues from "./FeatureVenue";

const GradientSection = styled.div`
    background: linear-gradient(to bottom, #e0f2fe, #ffe0b2);
    text-align: center;
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        padding: 60px 20px;
        margin-top:30px;
    }
`;

const GradientH1 = styled.h1`
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #333;

    @media (max-width: 768px) {
        font-size: 2em;
    }

    @media (max-width: 629px) {
        font-size: 2em;
    }

    @media (max-width: 480px) {
        font-size: 1.8em;
    }
`;

const GradientP = styled.p`
    font-size: 1.1em;
    margin-bottom: 30px;
    margin-top:30px;

    @media (max-width: 768px) {
        font-size: 1em;
    }

    @media (max-width: 629px) {
        font-size: 1em;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px; /* Add margin to create space */
`;

const Button = styled.button`
    padding: 12px 25px;
    border: none;
    border-radius: 25px;
    margin: 10px;
    cursor: pointer;
    font-size: 1em;
    background-color: #f0f0f0;

    @media (max-width: 629px) {
        padding: 10px 20px;
        font-size: 0.9em;
    }
`;

const ContentSection = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%; /* Adjust as needed */
    margin-top: 30px; /* Add margin to create space */

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

const Card = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 30px;
    margin: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 300px;
`;

const CardImg = styled.img`
    width: 60px;
    margin-bottom: 20px;
`;

const CardH3 = styled.h3`
    margin-bottom: 15px;
`;

function Welcome() {

    const navigate = useNavigate();

    const handleFindVenuesClick = () => {
        navigate('/venues');
    };
    const handleFindEventsClick = () => {
        navigate('/events');
    };

    return (
        <div>
            <GradientSection>
                <GradientH1>Connect, Play, Compete Together</GradientH1>
                <GradientP>
                    Discover sports venues near you, join events that match your interests, and connect with players who
                    share your passion.
                </GradientP>
                <Buttons>
                    <Button onClick={handleFindVenuesClick}>Find Venues</Button>
                    <Button onClick={handleFindEventsClick}>Join Events</Button>
                </Buttons>

                <ContentSection>
                    <Card>
                        <CardImg src="location-icon.svg" alt="Location Icon"/>
                        <CardH3>Find Perfect Venues</CardH3>
                        <p>Discover and book the best sports facilities tailored to your needs.</p>
                    </Card>
                    <Card>
                        <CardImg src="calendar-icon.svg" alt="Calendar Icon"/>
                        <CardH3>Join Live Events</CardH3>
                        <p>Register for tournaments, leagues, and casual games in your area.</p>
                    </Card>
                    <Card>
                        <CardImg src="people-icon.svg" alt="People Icon"/>
                        <CardH3>Build Your Network</CardH3>
                        <p>Connect with other players and create your own sports community.</p>
                    </Card>
                </ContentSection>
            </GradientSection>
            <FeaturedVenues />
        </div>

    );
}

export default Welcome;