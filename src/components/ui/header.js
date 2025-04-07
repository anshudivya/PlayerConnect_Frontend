import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Cart from './Cart';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaCalendarAlt, FaTrophy, FaSearch } from 'react-icons/fa';

export function Header({ eventsSectionRef }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [cartItems, setCartItems] = useState(['Event 1', 'Place 2']);
    const navigate = useNavigate(); // Add useNavigate hook

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const handleCartClick = () => {
        setShowCartPopup(true);
    };

    const handleCloseCartPopup = () => {
        setShowCartPopup(false);
    };

    const handleLoginSuccess = () => {
        handleCloseModal(); // Close the modal
        navigate('/'); // Redirect to the home page
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
                <a href="#events-section">
                    <FaCalendarAlt /> Events
                </a>
                <a href="#" onClick={handleCartClick}>
                    <FaTrophy /> Cart
                </a>
                <div className="search-bar">
                    <FaSearch />
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <button className="sign-in-button" onClick={handleLoginClick}>Sign In</button>
            </nav>
            {showLoginModal && <LoginForm onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
            {showCartPopup && <Cart cartItems={cartItems} onClose={handleCloseCartPopup} />}
        </header>
    );
}

export default Header;