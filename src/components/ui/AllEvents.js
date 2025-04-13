import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UpcomingEventsContainer = styled.div`
    padding: 20px;
    
    max-width: 1600px;
    margin: 20px auto;
    background-color: white;
    width: 80%;
`;

const UpcomingEventsTitle = styled.h6`
    font-size: 1.8rem;
    margin-bottom: 20px;
    display: flex;
   
    justify-content:space-between;
    align-items: space-between;

`;

const ViewAllLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-size: 1.2rem;
    display: flex;
    align-items: stretch;
`;

const EventGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjusted minmax width */
    gap: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjusted minmax width */
        gap: 20px;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
`;

const EventCard = styled.div`
    background: #fff;
    padding: 15px; /* Reduced padding */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    border: 1px solid #e0e0e0;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    height: auto; /* Changed height to auto */


    @media (max-width: 768px) {
        padding: 10px; /* Reduced padding for smaller screens */
    }

    &:hover{
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

const EventImage = styled.img`
    width: 100%;
    height: 120px; /* Reduced height */
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const EventName = styled.h3`
    font-size: 0.9rem; /* Reduced font size */
    margin-bottom: 5px;
    font-weight: 600;
`;

const EventDetails = styled.p`
    color: #666;
    font-size: 0.7rem; /* Reduced font size */
    margin-bottom: 8px;
`;

const SpotsLeft = styled.p`
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem; /* Reduced font size */
    margin-bottom: 10px;
`;

const SportTag = styled.span`
    background-color: #e0f7fa;
    color: #006064;
    padding: 3px 6px;
    border-radius: 12px;
    margin: 3px;
    font-size: 0.6rem; /* Reduced font size */
`;

const EventPrice = styled.p`
    font-weight: 600;
    font-size: 0.8rem; /* Reduced font size */
    margin-bottom: 10px;
`;

const RegisterButton = styled.button`
    padding: 8px 12px; /* Reduced padding */
    background-color: #fca311;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 0.7rem; /* Reduced font size */
    margin-top: auto;
`;

function AllEvents() {
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
            sport: "Football",
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
            sport: "Tennis",
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
            sport: "Basketball",
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
            sport: "Volleyball",
            date: "Sun, Apr 17",
        },
        // Add more dummy events as needed
    ];

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                // const response = await fetch('/api/events');
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const data = await response.json();
                setEvents(dummyEvents.slice(0, 4)); // Get the first 4 events
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error.message}</p>;

    const handleRegister = (eventId) => {
        // Implement your registration logic here
        console.log(`Registering for event: ${eventId}`);
        navigate('/register');
    };

    return (
        <UpcomingEventsContainer>
            <UpcomingEventsTitle>
                Upcoming Events
                <ViewAllLink href="/events">
                    View all events &rarr;
                </ViewAllLink>
            </UpcomingEventsTitle>
            <EventGrid>
                {events.map((event) => (
                    <EventCard key={event.id}>
                        <EventImage src={event.image} alt={event.name} />
                        <SportTag>{event.sport}</SportTag>
                        <EventName>{event.name}</EventName>
                        <EventDetails>
                            {event.time} | {event.location} <br />
                            {event.address} <br />
                            {event.date}
                        </EventDetails>
                        <SpotsLeft>
                            <span>{event.spotsLeft} spots left</span>
                            <span>{event.totalSpots} total</span>
                        </SpotsLeft>
                        <EventPrice>Price: ${event.price}</EventPrice>
                        <RegisterButton onClick={() => handleRegister(event.id)}>Register</RegisterButton>
                    </EventCard>
                ))}
            </EventGrid>
        </UpcomingEventsContainer>
    );
}

export default AllEvents;
