import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTrophy, FaSearch } from 'react-icons/fa';

export function Header({ showSignInButton, onSignInButtonVisibility }) { // Add onSignInButtonVisibility prop
    const navigate = useNavigate();
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [cartItems, setCartItems] = useState(['Event 1', 'Place 2']);


    const handleLoginClick = () => {
        onSignInButtonVisibility(false); // Notify App.js to hide the button
        navigate('/login');
    };

    const handleCartClick = () => {
        setShowCartPopup(true);
    };

    const handleCloseCartPopup = () => {
        setShowCartPopup(false);
    };



    return (
        <header>
            <div className="logo">PlayerConnect</div>
            <nav>
                <a href="#">
                    <Link to="/">
                        <FaHome /> Home
                    </Link>
                </a>
                <Link to="/venues">
                    <FaMapMarkerAlt /> Venues
                </Link>
                <Link to="/events">
                    <FaCalendarAlt /> Events
                </Link>
                <a href="#" onClick={handleCartClick}>
                    <FaTrophy /> Cart
                </a>

                {showSignInButton && (
                    <button className="sign-in-button" onClick={handleLoginClick}>Sign In</button>
                )}
            </nav>

            {showCartPopup && <Cart cartItems={cartItems} onClose={handleCloseCartPopup} />}
        </header>
    );
}

export default Header;