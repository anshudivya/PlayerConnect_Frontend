import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 40px 20px;
  font-family: sans-serif;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
    gap: 30px;
  }
`;

const FooterColumn = styled.div`
  text-align: left;
`;

const FooterTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const FooterText = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5em;

  &:hover {
    color: #ccc;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #444;
  margin-top: 40px;
  max-width: 1200px;
  margin: 40px auto 0;
`;

function FooterComponent() {
    return (
        <FooterContainer>
            <FooterGrid>
                <FooterColumn>
                    <FooterTitle>PlayConnect</FooterTitle>
                    <FooterText>
                        Connecting players to venues and events in your area. Find places to play, join communities, and participate in sporting events.
                    </FooterText>
                    <SocialIcons>
                        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </SocialIcon>
                        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </SocialIcon>
                        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </SocialIcon>
                    </SocialIcons>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Explore</FooterTitle>
                    <FooterLink href="#">Find Venues</FooterLink>
                    <FooterLink href="#">Discover Events</FooterLink>
                    <FooterLink href="#">Sports Categories</FooterLink>
                    <FooterLink href="#">Communities</FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Quick Links</FooterTitle>
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                </FooterColumn>

                <FooterColumn>
                    <FooterTitle>Contact</FooterTitle>
                    <FooterText>
                        <i className="far fa-envelope"></i> info@playconnect.com
                    </FooterText>
                    <FooterText>
                        <i className="fas fa-phone"></i> +1 (555) 123-4567
                    </FooterText>
                </FooterColumn>
            </FooterGrid>
            <Divider />
        </FooterContainer>
    );
}

export default FooterComponent;