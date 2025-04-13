import React from 'react';
import styled from 'styled-components';

const HerComponent2 = styled.section`
    background: #f8f8ff;
    padding: 60px 20px;
    text-align: center;
    font-family: sans-serif;

    @media (max-width: 768px) {
        padding: 40px 10px;
    }
`;

const HerContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const DecorativeLine = styled.div`
    width: 60px;
    height: 4px;
    background: #9370db;
    margin: 20px auto 40px;
    border-radius: 2px;

    @media (max-width: 768px) {
        margin: 15px auto 30px;
    }
`;

const TestimonialGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
`;

const TestimonialCard = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    text-align: left;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const UserAvatar = styled.div`
    width: 60px;
    height: 60px;
    background: #e0e0e0;
    border-radius: 50%;
    margin-bottom: 15px;
`;

const UserName = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
`;

const UserRating = styled.div`
    color: #ffc107;
    margin-bottom: 15px;
`;

const UserTestimonial = styled.p`
    color: #666;
    line-height: 1.6;
    font-size: 0.95em;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;

function HerComponent2Component() {
    return (
        <HerComponent2>
            <HerContent>
                <h2>What Players Say</h2>
                <DecorativeLine />
                <TestimonialGrid>
                    <TestimonialCard>
                        <UserAvatar />
                        <UserName>Michael Johnson</UserName>
                        <UserRating>★★★★★</UserRating>
                        <UserTestimonial>
                            "PlayerLink has completely changed how I find tennis partners. I've met amazing players in my area and improved my game significantly."
                        </UserTestimonial>
                    </TestimonialCard>

                    <TestimonialCard>
                        <UserAvatar />
                        <UserName>Sarah Williams</UserName>
                        <UserRating>★★★★★</UserRating>
                        <UserTestimonial>
                            "Finding basketball courts used to be so difficult until I discovered this platform. Now my weekends are filled with games and new friends."
                        </UserTestimonial>
                    </TestimonialCard>

                    <TestimonialCard>
                        <UserAvatar />
                        <UserName>David Chen</UserName>
                        <UserRating>★★★★★</UserRating>
                        <UserTestimonial>
                            "As a venue owner, PlayerLink has helped me reach more customers and fill empty slots. The booking system is so smooth and user-friendly!"
                        </UserTestimonial>
                    </TestimonialCard>
                </TestimonialGrid>
            </HerContent>
        </HerComponent2>
    );
}

export default HerComponent2Component;