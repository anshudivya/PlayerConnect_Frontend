import React from 'react';
import venue from './venue';

function hero() {
    return (
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '50px' }}>
            <div>
                <h1>Book a sports venue near you</h1>
                <p>Discover an array of courts, turfs and play zones near you!</p>
                <button style={{ backgroundColor: 'orange', color: 'white', padding: '15px 20px', border: 'none', borderRadius: '5px' }}>Explore Now</button>
            </div>
            <div>
                <venue />
            </div>
        </section>
    );
}

export default hero;