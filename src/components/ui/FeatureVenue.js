import React, { useState } from 'react';
import styled from 'styled-components';
import VenuePage from "./VenuePage";
import { useNavigate } from 'react-router-dom';

const FeaturedVenuesContainer = styled.div`
    padding: 20px;
    width: 80%;
    max-width: 1600px;
    margin: 20px auto;
    background-color: white
`;

const FeaturedVenuesTitle = styled.h6`
    font-size: 1.8rem;
    margin-bottom: 20px;
    display: flex;

    justify-content:space-between;
    margin-left: 32px;
    margin-right: 30px;
    
    
`;

const ViewAllLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-size: 1.2rem;
    display: flex;
    align-items: stretch;
`;

const VenueGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 280px);
    gap: 50px;
    justify-content: center;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const VenueCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    border: 1px solid #e0e0e0;
    transition: transform 0.2s ease-in-out;

    @media (max-width: 768px) {
        padding: 15px;
    }

    &:hover{
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

const VenueImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const VenueName = styled.h3`
    font-size: 1rem;
    margin-bottom: 5px;
    font-weight: 600;
`;

const VenueAddress = styled.p`
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 8px;
`;

const VenueSports = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const SportTag = styled.span`
    background-color: #e0f7fa;
    color: #006064;
    padding: 3px 6px;
    border-radius: 12px;
    margin: 3px;
    font-size: 0.7rem;
`;

const VenuePrice = styled.p`
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 15px;
`;

const BookButton = styled.button`
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 0.8rem;
    margin-top: auto;
`;

const VenueRating = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const Rating = styled.span`
    background-color: #f0f0f0;
    padding: 3px 6px;
    border-radius: 12px;
    font-size: 0.7rem;
`;

const OpenStatus = styled.span`
    color: green;
    font-size: 0.7rem;
`;

const AvailableNow = styled.span`
    background-color: #d1fae5;
    color: #065f46;
    padding: 3px 6px;
    border-radius: 12px;
    font-size: 0.7rem;
    position: absolute;
    top: 10px;
    right: 10px;
`;

function FeaturedVenues() {
    const [venues, setVenues] = useState(null);
    const navigate = useNavigate();

    const handleVenuesLoaded = (data) => {
        console.log("Venues received in FeaturedVenues:", data);
        setVenues(data);
    };

    const handlelogin = () => {
        navigate('/login');
    };

    if (!venues) {
        return <VenuePage onVenuesLoaded={handleVenuesLoaded} />;
    }

    return (
        <FeaturedVenuesContainer>
            <FeaturedVenuesTitle>
                Featured Venues
                <ViewAllLink href="/venues">
                    View all venues &rarr;
                </ViewAllLink>
            </FeaturedVenuesTitle>
            <VenueGrid>
                {venues.slice(0, 4).map((venue) => (
                    <VenueCard key={venue.id}>
                        <VenueImage src={venue.image} alt={venue.name} />
                        {/*<AvailableNow>Available Now</AvailableNow>*/}
                        <VenueRating>
                            <Rating>★ 4.5</Rating>
                            <OpenStatus>Open</OpenStatus>
                        </VenueRating>
                        <VenueName>{venue.name}</VenueName>
                        <VenueAddress>{venue.address}</VenueAddress>
                        <VenueSports>
                            {venue.sports.map((sport, index) => (
                                <SportTag key={index}>{sport}</SportTag>
                            ))}
                        </VenueSports>
                        <VenuePrice>From Rs. {venue.price}/hr</VenuePrice>
                        <BookButton onClick={handlelogin}>Book Now</BookButton>
                    </VenueCard>
                ))}
            </VenueGrid>
        </FeaturedVenuesContainer>
    );
}

export default FeaturedVenues;