import React from 'react';

function ContentCards() {
    const cards = [
        {
            icon: 'placeholder-icon1', // Replace with actual icon component or image
            title: 'Popular Venues',
            description: 'Discover the most popular sports venues in your area.',
        },
        {
            icon: 'placeholder-icon2', // Replace with actual icon component or image
            title: 'Join Live Events',
            description: 'Find and join exciting live sports events near you.',
        },
        {
            icon: 'placeholder-icon3', // Replace with actual icon component or image
            title: 'Build Your Network',
            description: 'Connect with other sports enthusiasts and players.',
        },
    ];

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">{card.icon}</div>
                    <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ContentCards;