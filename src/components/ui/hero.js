import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
    background: linear-gradient(135deg, #f8f8ff, #f0f0f8); /* Light background */
    padding: 60px 20px;
    text-align: center;
    font-family: sans-serif;
`;

const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
`;

const Card = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform-style: preserve-3d;

    &:hover {
        transform: translateY(-8px) rotateX(3deg) rotateY(3deg);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const CardIcon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em; /* Adjust icon size */
`;

const DiscoverIcon = styled(CardIcon)`
    color: #9370db; /* Purple color */
    background: rgba(147, 112, 219, 0.1); /* Light purple background */
`;

const BookIcon = styled(CardIcon)`
    color: #3cb371; /* Green color */
    background: rgba(60, 179, 113, 0.1); /* Light green background */
`;

const ConnectIcon = styled(CardIcon)`
    color: #e91e63; /* Pink color */
    background: rgba(233, 30, 99, 0.1); /* Light pink background */
`;

const TrackIcon = styled(CardIcon)`
    color: #4169e1; /* Blue color */
    background: rgba(65, 105, 225, 0.1); /* Light blue background */
`;

const CardH3 = styled.h3` // Corrected line
    color: #333;
    margin-bottom: 12px;
    font-size: 1.3em;
`;

const CardP = styled.p` // Added styled p
    color: #666;
    line-height: 1.6;
    font-size: 0.95em;
`;

const DecorativeLine = styled.div`
    width: 60px;
    height: 4px;
    background: #9370db;
    margin: 20px auto 40px;
    border-radius: 2px;

    @media (max-width: 768px) {
        margin: 15px auto 30px;
    }
`;

function HeroSectionComponent() {
    return (
        <HeroSection>
            <HeroContent>
                <h1>How PlayerLink Works</h1>
                <DecorativeLine />
                <CardGrid>
                    <Card>
                        <DiscoverIcon>
                            <i className="fas fa-map-marker-alt"></i> {/* Replace with your icon */}
                        </DiscoverIcon>
                        <CardH3>Discover Venues</CardH3>
                        <CardP>Find the perfect sports facilities near you with advanced filters for amenities and availability.</CardP>
                    </Card>

                    <Card>
                        <BookIcon>
                            <i className="far fa-calendar-check"></i> {/* Replace with your icon */}
                        </BookIcon>
                        <CardH3>Book & Reserve</CardH3>
                        <CardP>Secure your spot with easy booking, real-time availability, and instant confirmations.</CardP>
                    </Card>

                    <Card>
                        <ConnectIcon>
                            <i className="fas fa-users"></i> {/* Replace with your icon */}
                        </ConnectIcon>
                        <CardH3>Connect & Play</CardH3>
                        <CardP>Join events, meet like-minded players, and build your sports network in your area.</CardP>
                    </Card>

                    <Card>
                        <TrackIcon>
                            <i className="fas fa-trophy"></i> {/* Replace with your icon */}
                        </TrackIcon>
                        <CardH3>Track Progress</CardH3>
                        <CardP>Monitor your activity, achievements, and improve your game with personalized insights.</CardP>
                    </Card>
                </CardGrid>
            </HeroContent>
        </HeroSection>
    );
}

export default HeroSectionComponent;