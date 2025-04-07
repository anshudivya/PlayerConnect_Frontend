import React from 'react';
import { useParams } from 'react-router-dom';
import eventsData from './eventsData';

function EventDetail() {
    const { eventId } = useParams();
    const event = eventsData.find((event) => event.id === eventId);

    if (!event) {
        return <div>Event not found.</div>;
    }

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            margin: '20px',
            maxWidth: '800px', // Adjust as needed
            margin: '20px auto', // Center the card
        }}>
            <h1>{event.title}</h1>
            <p>{event.details}</p>
            <p>Price: {event.price}</p>
            <button style={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}>Enroll</button>
        </div>
    );
}

export default EventDetail;