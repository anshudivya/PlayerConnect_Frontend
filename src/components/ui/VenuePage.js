import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const VenuesContainer = styled.div`
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 1500px;
    margin: 40px auto;

    @media (max-width: 768px) {
        padding: 20px;
        margin: 20px auto;
    }
`;

const VenuesTitle = styled.h1`
    font-size: 2.8em;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
`;

const VenuesSubtitle = styled.p`
    font-size: 1.2em;
    color: #666;
    margin-bottom: 40px;
    text-align: center;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SearchInput = styled.input`
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
    margin-right: 20px;

    @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

const FilterButton = styled.button`
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
`;

const FilterOptions = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 150px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 10;
`;

const FilterOption = styled.div`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const VenueGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
`;

const VenueCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const VenueImage = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
`;

const VenueName = styled.h3`
    font-size: 1.5em;
    margin-bottom: 10px;
`;

const VenueAddress = styled.p`
    color: #666;
    margin-bottom: 15px;
`;

const VenueSports = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
`;

const SportTag = styled.span`
    background-color: #e0f7fa;
    color: #006064;
    padding: 5px 10px;
    border-radius: 15px;
    margin: 5px;
    font-size: 0.9em;
`;

const VenuePrice = styled.p`
    font-weight: bold;
    margin-bottom: 20px;
`;

const BookButton = styled.button`
    padding: 12px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
`;

function VenuePage({ onVenuesLoaded }) {
    const feed = [
        {
            "id": 1,
            "name": "Downtown Sports Complex",
            "address": "123 Main St, Downtown - 2.5 km",
            "sports": ["Football", "Basketball", "Tennis"],
            "price": 25,
            "image": "https://via.placeholder.com/350x200"
        },
        {
            "id": 2,
            "name": "Riverside Tennis Club",
            "address": "456 Park Ave, Riverside - 4.1 km",
            "sports": ["Tennis", "Badminton"],
            "price": 18,
            "image": "https://via.placeholder.com/350x200"
        },
        {
            "id": 3,
            "name": "Downtown Sports Complex",
            "address": "123 Main St, Downtown - 2.5 km",
            "sports": ["Football", "Basketball", "Tennis"],
            "price": 25,
            "image": "https://via.placeholder.com/350x200"
        },
        {
            "id": 4,
            "name": "Riverside Tennis Club",
            "address": "456 Park Ave, Riverside - 4.1 km",
            "sports": ["Tennis", "Badminton"],
            "price": 18,
            "image": "https://via.placeholder.com/350x200"
        },
        // ... more venue objects
    ];
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSport, setSelectedSport] = useState('All Sports');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function getVenues() {
            setLoading(true);
            setError(null);
            try {
                const data = feed;
                setVenues(data);
                console.log("Venues fetched in VenuePage:", data);
                if (onVenuesLoaded) {
                    onVenuesLoaded(data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        getVenues();

        // Check login status
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(!!loggedIn);
    }, [onVenuesLoaded]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleBookNow = (venue) => {
        if (isLoggedIn) {
            navigate(`/availability/bookvenue/${venue.id}`);
        } else {
            navigate('/login');
        }
    };

    const handleSportFilterChange = (sport) => {
        setSelectedSport(sport);
        setIsFilterOpen(false);
    };

    const filteredVenues = selectedSport === 'All Sports'
        ? venues
        : venues.filter(venue => venue.sports.includes(selectedSport));

    const allSports = ['All Sports', 'Football', 'Cricket', 'Badminton', 'Tennis'];

    return (
        <VenuesContainer>
            <VenuesTitle>Find Sports Venues Near You</VenuesTitle>
            <VenuesSubtitle>Discover and book the perfect place to play</VenuesSubtitle>

            <SearchContainer>
                <SearchInput placeholder="Search venues..." />
                <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    Filter Sports
                    <FilterOptions isOpen={isFilterOpen}>
                        {allSports.map(sport => (
                            <FilterOption key={sport} onClick={() => handleSportFilterChange(sport)}>
                                {sport}
                            </FilterOption>
                        ))}
                    </FilterOptions>
                </FilterButton>
            </SearchContainer>

            <VenueGrid>
                {filteredVenues.map((venue) => (
                    <VenueCard key={venue.id}>
                        <VenueImage src={venue.image} alt={venue.name} />
                        <VenueName>{venue.name}</VenueName>
                        <VenueAddress>{venue.address}</VenueAddress>
                        <VenueSports>
                            {venue.sports.map((sport, index) => (
                                <SportTag key={index}>{sport}</SportTag>
                            ))}
                        </VenueSports>
                        <VenuePrice>₹{venue.price}/hr</VenuePrice>
                        <BookButton onClick={() => handleBookNow(venue)}>Book Now</BookButton>
                    </VenueCard>
                ))}
            </VenueGrid>
        </VenuesContainer>
    );
}

export default VenuePage;