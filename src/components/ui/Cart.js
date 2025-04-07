import React, { useState, useEffect } from 'react';

function Cart({ cartItems: propCartItems, onClose }) { // rename prop to avoid shadowing
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate data fetching (replace with your actual data fetching logic)
        setTimeout(() => {
            if (propCartItems) {
                setCartItems(propCartItems);
                setLoading(false);
            } else {
                setError("Cart Items not available");
                setLoading(false);
            }
        }, 1000);
    }, [propCartItems]);

    if (loading) {
        return (
            <div className="cart-popup">
                <div className="cart-popup-content">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button onClick={onClose}>Close</button>
                    </div>
                    <ul className="cart-items">
                        <li>Loading...</li>
                    </ul>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-popup">
                <div className="cart-popup-content">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button onClick={onClose}>Close</button>
                    </div>
                    <ul className="cart-items">
                        <li>Error occured...</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-popup">
            <div className="cart-popup-content">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button onClick={onClose}>Close</button>
                </div>
                <ul className="cart-items">
                    {cartItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Cart;