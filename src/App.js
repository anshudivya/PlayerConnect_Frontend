import React, { useRef } from 'react';
import Header from './components/ui/header';
import Hero from './components/ui/hero';
import Footer from './components/ui/footer';
import './styles/introcards.css';
import './App.css'
import './styles/LoginForm.css'
import './styles/Cart.css'
import './styles/Header.css'
import EventDetail from "./components/ui/EventDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenuesPage from "./components/ui/VenuePage";
import './styles/ContentCards.css'
import Welcome from "./components/ui/introwelcome";
import AvailabilityPage from "./components/ui/AvailabilityPage";
import ConfirmationPage from "./components/ui/ConfirmationPage";
import LoginPage from "./components/ui/LoginPage";


function App() {


    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Welcome />
                            <div className="main-content-container">


                                {/*<Introcards />*/}
                                <Hero />
                            </div>
                            <Footer />
                        </>
                    } />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/availability/bookvenue/:venueId" element={<AvailabilityPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    {/*<Route path="/payment" element={<PaymentPage />} />*/}
                    <Route path="/event/:eventId" element={<EventDetail />} />
                </Routes>
            </div>
        </Router>

    );
}

export default App;