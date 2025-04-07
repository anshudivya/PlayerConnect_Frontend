import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const AvailabilityContainer = styled.div`
    padding: 40px;
    background: linear-gradient(135deg, #e0f7fa 0%, #cce0f5 50%, #d1c4e9 100%);
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    max-width: 1500px;
    margin: 40px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const VenueDetails = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const VenueImage = styled.img`
    width: 150px;
    height: 100px;
    border-radius: 8px;
    margin-right: 20px;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VenueInfo = styled.div`
    flex: 1;
`;

const SportSelector = styled.select`
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 200px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

const DatePicker = styled.input`
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 200px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

const DurationSelector = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    label {
        margin-right: 10px;
        font-weight: 500;
    }
    select {
        padding: 12px 16px;
        border: 1px solid #ced4da;
        border-radius: 8px;
        font-size: 16px;
        &:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    }
`;

const TimeSliderContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
`;

const TimeSlider = styled.div`
    width: 100%;
    height: 12px;
    border-radius: 6px;
    background: ${({ timeSlots }) => {
        const now = new Date().getHours();
        if (!timeSlots || timeSlots.length === 0) {
            return 'linear-gradient(to right, #dc3545 0%, #dc3545 100%)';
        }
        return `linear-gradient(to right, ${timeSlots.map((slot, index) => {
            const color = index < now ? '#fff' : (slot.available ? '#28a745' : '#dc3545');
            return `${color} ${(index / timeSlots.length) * 100}%, ${color} ${((index + 1) / timeSlots.length) * 100}%`;
        })})`;
    }};
    position: relative;
`;

const TimeLabels = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #6c757d;
    margin-top: 8px;
`;

const RangeSelector = styled.div`
    position: absolute;
    top: -6px;
    height: 24px;
    background-color: rgba(0, 123, 255, 0.3);
    border-radius: 6px;
    cursor: pointer;
    left: ${({ startPosition }) => startPosition}%;
    width: ${({ width }) => width}%;
`;

const TimeDisplay = styled.p`
    font-size: 1.1em;
    margin-bottom: 20px;
    font-weight: 500;
`;

const AvailableRanges = styled.select`
    padding: 12px 16px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 200px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

const BookButton = styled.button`
    padding: 14px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
    ${({ disabled }) => disabled && `
        background-color: #cccccc;
        cursor: not-allowed;
    `}
`;

const SelectedDetails = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    p {
        margin-bottom: 8px;
    }
`;

const InputRow = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    & > * {
        margin-right: 10px;
    }
`;

const TotalAmount = styled.p`
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 20px;
`;

function AvailabilityPage() {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedRange, setSelectedRange] = useState({ start: 0, end: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const sliderRef = useRef(null);
    const [duration, setDuration] = useState(1);
    const [availableRanges, setAvailableRanges] = useState([]);
    const [selectedAvailableRange, setSelectedAvailableRange] = useState(null);

    useEffect(() => {
        async function fetchVenue() {
            try {
                const data = {
                    id: venueId,
                    name: 'Downtown Sports Complex',
                    address: '123 Main St, Downtown - 2.5 km',
                    sports: ['Football', 'Basketball', 'Tennis'],
                    price: 25,
                    image: 'https://via.placeholder.com/350x200',
                    timeSlots: {
                        Football: [
                            { time: 0, available: true }, { time: 1, available: false }, { time: 2, available: true }, { time: 3, available: true }, { time: 4, available: false }, { time: 5, available: true }, { time: 6, available: true }, { time: 7, available: false }, { time: 8, available: true }, { time: 9, available: true }, { time: 10, available: false }, { time: 11, available: true }, { time: 12, available: true }, { time: 13, available: false }, { time: 14, available: true }, { time: 15, available: true }, { time: 16, available: false }, { time: 17, available: true }, { time: 18, available: true }, { time: 19, available: false }, { time: 20, available: true }, { time: 21, available: true }, { time: 22, available: false }, { time: 23, available: true },
                        ],
                        Basketball: [
                            { time: 0, available: false }, { time: 1, available: false }, { time: 2, available: false }, { time: 3, available: false }, { time: 4, available: false }, { time: 5, available: false }, { time: 6, available: false }, { time: 7, available: false }, { time: 8, available: false }, { time: 9, available: false }, { time: 10, available: false }, { time: 11, available: false }, { time: 12, available: false }, { time: 13, available: false }, { time: 14, available: false }, { time: 15, available: false }, { time: 16, available: false }, { time: 17, available: false }, { time: 18, available: false }, { time: 19, available: false }, { time: 20, available: false }, { time: 21, available: false }, { time: 22, available: false }, { time: 23, available: false },
                        ],
                        Tennis: [
                            { time: 0, available: true }, { time: 1, available: true }, { time: 2, available: true }, { time: 3, available: true }, { time: 4, available: true }, { time: 5, available: true }, { time: 6, available: true }, { time: 7, available: true }, { time: 8, available: true }, { time: 9, available: true }, { time: 10, available: true }, { time: 11, available: true }, { time: 12, available: true }, { time: 13, available: true }, { time: 14, available: true }, { time: 15, available: true }, { time: 16, available: true }, { time: 17, available: true }, { time: 18, available: true }, { time: 19, available: true }, { time: 20, available: true }, { time: 21, available: true }, { time: 22, available: true }, { time: 23, available: true },
                        ]
                    }
                };
                setVenue(data);
            } catch (error) {
                console.error('Error fetching venue:', error);
            }
        }

        fetchVenue();
    }, [venueId]);

    useEffect(() => {
        if (venue && venue.timeSlots && selectedSport) {
            setTimeSlots(venue.timeSlots[selectedSport] || []);
        } else {
            setTimeSlots([]);
        }
    }, [venue, selectedSport]);

    useEffect(() => {
        filterAvailableRanges();
    }, [duration, timeSlots]);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
    };

    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value);
        setDuration(newDuration);

        const availableRange = availableRanges.find(range => range.end - range.start === newDuration);
        if (availableRange) {
            setSelectedRange({ start: availableRange.start, end: availableRange.end });
            setSelectedAvailableRange({ start: availableRange.start, end: availableRange.end });
        }
    };

    const handleRangeMouseDown = (event) => {
        setIsDragging(true);
        setDragStart(event.clientX);
    };

    const handleRangeMouseMove = (event) => {
        if (!isDragging) return;

        const sliderRect = sliderRef.current.getBoundingClientRect();
        const dragPercentage = (event.clientX - dragStart) / sliderRect.width * 100;

        const newStart = Math.max(0, Math.min(23, selectedRange.start + dragPercentage / (100 / 23)));
        const newEnd = Math.max(0, Math.min(23, selectedRange.end + dragPercentage / (100 / 23)));

        setSelectedRange({ start: Math.round(Math.min(newStart, newEnd)), end: Math.round(Math.max(newStart, newEnd)) });
        setDragStart(event.clientX);
    };

    const handleRangeMouseUp = () => {
        setIsDragging(false);
    };

    const generateTimeLabels = () => {
        const labels = [];
        for (let i = 0; i <= 23; i++) {
            const time = i > 12 ? `${i - 12}:00 PM` : `${i === 0 ? 12 : i}:00 ${i < 12 ? 'AM' : 'PM'}`;
            labels.push(<span key={i}>{time}</span>);
        }
        return labels;
    };

    const calculateRangePosition = () => {
        return (selectedRange.start / 23) * 100;
    };

    const calculateRangeWidth = () => {
        return ((selectedRange.end - selectedRange.start) / 23) * 100;
    };

    const filterAvailableRanges = () => {
        if (!timeSlots || timeSlots.length === 0) {
            setAvailableRanges([]);
            return;
        }

        const now = new Date().getHours();
        const ranges = [];
        for (let i = 0; i <= 23 - duration + 1; i++) {
            if (i < now) continue;

            let available = true;
            for (let j = 0; j < duration; j++) {
                const index = i + j;
                if (index >= timeSlots.length || !timeSlots[index] || !timeSlots[index].available) {
                    available = false;
                    break;
                }
            }
            if (available) {
                ranges.push({ start: i, end: i + duration });
            }
        }
        setAvailableRanges(ranges);
    };

    const handleAvailableRangeChange = (event) => {
        const value = event.target.value;
        if (value) {
            const [start, end] = value.split('-').map(Number);
            setSelectedAvailableRange({ start, end });
            setSelectedRange({ start, end });
        } else {
            setSelectedAvailableRange(null);
        }
    };

    const handleBook = async () => {
        if (selectedAvailableRange && venue) {
            navigate('/confirmation', {
                state: {
                    venueName: venue.name,
                    venueAddress: venue.address,
                    sport: selectedSport,
                    date: selectedDate,
                    time: `${selectedRange.start}:00 - ${selectedRange.end}:00`,
                    totalAmount: venue.price * duration,
                },
            });
        } else {
            alert("Please select a time range.");
        }
    };

    const getAvailableDurationOptions = () => {
        if (!timeSlots || timeSlots.length === 0) {
            return [];
        }

        const availableDurations = new Set();
        for (let duration = 1; duration <= timeSlots.length; duration++) {
            for (let start = 0; start <= timeSlots.length - duration; start++) {
                let available = true;
                for (let i = 0; i < duration; i++) {
                    if (!timeSlots[start + i].available) {
                        available = false;
                        break;
                    }
                }
                if (available) {
                    availableDurations.add(duration);
                }
            }
        }

        const options = Array.from(availableDurations).sort((a, b) => a - b).map(duration => (
            <option key={duration} value={duration}>
                {duration}
            </option>
        ));

        return options;
    };

    return (
        <AvailabilityContainer>
            {venue && (
                <>
                    <VenueDetails>
                        <VenueImage src={venue.image} alt={venue.name} />
                        <VenueInfo>
                            <h2>{venue.name}</h2>
                            <p>{venue.address}</p>
                        </VenueInfo>
                    </VenueDetails>

                    <InputRow>
                        <SportSelector value={selectedSport} onChange={handleSportChange}>
                            <option value="">Select Sport</option>
                            {venue.sports.map((sport) => (
                                <option key={sport} value={sport}>
                                    {sport}
                                </option>
                            ))}
                        </SportSelector>

                        <DatePicker type="date" value={selectedDate} onChange={handleDateChange} />

                        <DurationSelector>
                            <label>Duration (hours):</label>
                            <select value={duration} onChange={handleDurationChange}>
                                {getAvailableDurationOptions()}
                            </select>
                        </DurationSelector>
                    </InputRow>

                    <TimeDisplay>
                        Selected Time: {selectedRange.start}:00 - {selectedRange.end}:00
                    </TimeDisplay>
                    <TimeSliderContainer>
                        <TimeSlider ref={sliderRef} timeSlots={timeSlots} />
                        <TimeLabels>{generateTimeLabels()}</TimeLabels>
                        {timeSlots.length > 0 ?
                            <RangeSelector
                                startPosition={calculateRangePosition()}
                                width={calculateRangeWidth()}
                                onMouseDown={handleRangeMouseDown}
                                onMouseMove={handleRangeMouseMove}
                                onMouseUp={handleRangeMouseUp}
                            />
                            : <p>No slot for this sport</p>
                        }

                    </TimeSliderContainer>

                    <AvailableRanges value={selectedAvailableRange ? `${selectedAvailableRange.start}-${selectedAvailableRange.end}` : ''} onChange={handleAvailableRangeChange}>
                        <option value="">Select Time Range</option>
                        {availableRanges.map((range) => (
                            <option key={`${range.start}-${range.end}`} value={`${range.start}-${range.end}`}>
                                {range.start}:00 - {range.end}:00
                            </option>
                        ))}
                    </AvailableRanges>

                    <SelectedDetails>
                        <p>Venue: {venue.name}</p>
                        <p>Sport: {selectedSport}</p>
                        <p>Date: {selectedDate}</p>
                        <p>Time: {selectedRange.start}:00 - {selectedRange.end}:00</p>
                    </SelectedDetails>

                    {venue && selectedAvailableRange && (
                        <TotalAmount>
                            Total Amount: ₹{venue.price * duration}
                        </TotalAmount>
                    )}

                    <BookButton onClick={handleBook} disabled={!selectedAvailableRange}>
                        {selectedAvailableRange ? 'Book Now' : 'Book Now'}
                    </BookButton>
                </>
            )}
        </AvailabilityContainer>
    );
}

export default AvailabilityPage;