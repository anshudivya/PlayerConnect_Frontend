import React from 'react';
import  { useState } from 'react';
import Header from './components/ui/header';
import Hero from './components/ui/hero';
import Footer from './components/ui/footer';
import './styles/introcards.css';
import './App.css';
import './styles/LoginForm.css';
import './styles/Cart.css';
import './styles/Header.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenuesPage from './components/ui/VenuePage';
import './styles/ContentCards.css';
import Welcome from './components/ui/introwelcome';
import AvailabilityPage from './components/ui/AvailabilityPage';
import ConfirmationPage from './components/ui/ConfirmationPage';
import LoginPage from './components/ui/LoginPage';
import AllEvents from './components/ui/AllEvents';
import EventsPage from './components/ui/EventsPage';
import HeroSectionComponent from './components/ui/hero';
import HerComponent2Component from './components/ui/HerComponent2Component';
import LastFooterComponent from './components/ui/LastFooterComponent';
import FooterComponent from './components/ui/footer';
import './globalStyle.css'; // Import global styles
import ThreeDSignupForm from "./components/ui/ThreeDSignupForm";

function App() {
    const [showSignInButton, setShowSignInButton] = useState(true);

    const handleSignInButtonVisibility = (isVisible) => {
        setShowSignInButton(isVisible);
    };


    return (
        <Router>
            <div>
                <Header showSignInButton={showSignInButton} onSignInButtonVisibility={handleSignInButtonVisibility}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Welcome />
                                <div className="main-content-container">
                                    <AllEvents />
                                    <HeroSectionComponent />
                                    <HerComponent2Component />
                                </div>
                                <LastFooterComponent />
                                <FooterComponent />
                            </>
                        }
                    />
                    <Route path="/login" element={<LoginPage onSignInButtonVisibility={handleSignInButtonVisibility} />} />
                    <Route path="/signup" element={< ThreeDSignupForm/>} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/availability/bookvenue/:venueId" element={<AvailabilityPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;