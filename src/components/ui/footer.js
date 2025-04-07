import React from 'react';

function footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h2>Find A Venue</h2>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                {/* Add your sports icons/images here */}
                <img src="sport1.png" alt="Sport 1" style={{ width: '50px', margin: '0 10px' }} />
                <img src="sport2.png" alt="Sport 2" style={{ width: '50px', margin: '0 10px' }} />
                {/* ... more images */}
            </div>
            <a href="#">EXPLORE SPORTS VENUE</a>
        </footer>
    );
}

export default footer;