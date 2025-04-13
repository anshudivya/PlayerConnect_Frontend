import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EventsContainer = styled.div`
    padding: 40px;
    background-color: #e8e8e8;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    max-width: 1500px;
    margin: 40px auto;
    font-family: 'Georgia', serif;

    @media (max-width: 768px) {
        padding: 20px;
        margin: 20px auto;
    }
`;

const EventsTitle = styled.h1`
    font-size: 2.8em;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventsSubtitle = styled.p`
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
    border: 2px solid #ccc;
    border-radius: 6px;
    flex: 1;
    margin-right: 20px;
    font-size: 1em;
`;

const FilterButton = styled.button`
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const FilterOption = styled.div`
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const EventGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
`;

const EventCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.15);
    padding: 20px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
    }
`;

const EventImage = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const EventName = styled.h3`
    font-size: 1.5em;
    margin-bottom: 10px;
    font-weight: 600;
`;

const EventAddress = styled.p`
    color: #666;
    margin-bottom: 15px;
`;

const EventSports = styled.div`
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

const EventPrice = styled.p`
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: auto;
`;

const RegisterButton = styled.button`
    padding: 12px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSport, setSelectedSport] = useState('All Sports');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    const dummyEvents = [
        {
            id: 1,
            name: "Sunday Football League",
            time: "2:00 PM",
            location: "City Sports Club",
            address: "Downtown Sports Complex",
            spotsLeft: 8,
            totalSpots: 22,
            price: 15,
            image: "https://via.placeholder.com/350x200?text=Football",
            sport: ["Football"],
            date: "Sun, Apr 10",
        },
        {
            id: 2,
            name: "Beginner's Tennis Workshop",
            time: "10:00 AM",
            location: "Tennis Academy",
            address: "Riverside Tennis Club",
            spotsLeft: 4,
            totalSpots: 12,
            price: 25,
            image: "https://via.placeholder.com/350x200?text=Tennis",
            sport: ["Tennis"],
            date: "Sat, Apr 16",
        },
        {
            id: 3,
            name: "Basketball 3v3 Tournament",
            time: "6:00 PM",
            location: "Street Ballers",
            address: "Urban Basketball Arena",
            spotsLeft: 12,
            totalSpots: 24,
            price: 10,
            image: "https://via.placeholder.com/350x200?text=Basketball",
            sport: ["Basketball"],
            date: "Fri, Apr 15",
        },
        {
            id: 4,
            name: "Community Volleyball Day",
            time: "12:00 PM",
            location: "Community Sports",
            address: "Beach Side Courts",
            spotsLeft: 26,
            totalSpots: 40,
            price: "Free",
            image: "https://via.placeholder.com/350x200?text=Volleyball",
            sport: ["Volleyball"],
            date: "Sun, Apr 17",
        },
    ];

    useEffect(() => {
        async function getEvents() {
            setLoading(true);
            setError(null);
            try {
                // const response = await fetch('/api/events');
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const data = await response.json();
                setEvents(dummyEvents);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        getEvents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSportFilterChange = (sport) => {
        setSelectedSport(sport);
        setIsFilterOpen(false);
    };

    const filteredEvents = selectedSport === 'All Sports'
        ? events
        : events.filter(event => event.sport && event.sport.includes(selectedSport));

    const allSports = ['All Sports', 'Football', 'Cricket', 'Badminton', 'Tennis'];

    return (
        <EventsContainer>
            <EventsTitle>Find Sports Events Near You</EventsTitle>
            <EventsSubtitle>Discover and register for exciting events</EventsSubtitle>

            <SearchContainer>
                <SearchInput placeholder="Search events..." />
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

            {Array.isArray(filteredEvents) && filteredEvents.length === 1 ? (
                <EventCard key={filteredEvents[0].id}>
                    <EventImage src={filteredEvents[0].image} alt={filteredEvents[0].name} />
                    <EventName>{filteredEvents[0].name}</EventName>
                    <EventAddress>{filteredEvents[0].address}</EventAddress>
                    <EventSports>
                        {filteredEvents[0].sport && filteredEvents[0].sport.map((sport, index) => (
                            <SportTag key={index}>{sport}</SportTag>
                        ))}
                    </EventSports>
                    <EventPrice>₹{filteredEvents[0].price}</EventPrice>
                    <RegisterButton onClick={() => navigate(`/event/${filteredEvents[0].id}`)}>Register</RegisterButton>
                </EventCard>
            ) : (
                <EventGrid>
                    {Array.isArray(filteredEvents) && filteredEvents.map((event) => (
                        <EventCard key={event.id}>
                            <EventImage src={event.image} alt={event.name} />
                            <EventName>{event.name}</EventName>
                            <EventAddress>{event.address}</EventAddress>
                            <EventSports>
                                {event.sport && event.sport.map((sport, index) => (
                                    <SportTag key={index}>{sport}</SportTag>
                                ))}
                            </EventSports>
                            <EventPrice>₹{event.price}</EventPrice>
                            <RegisterButton onClick={() => navigate(`/event/${event.id}`)}>Register</RegisterButton>
                        </EventCard>
                    ))}
                </EventGrid>
            )}
        </EventsContainer>
    );
}

export default EventsPage;