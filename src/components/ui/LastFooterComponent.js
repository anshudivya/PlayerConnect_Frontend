import React from 'react';
import styled from 'styled-components';

const LastFooter = styled.section`
  background: linear-gradient(90deg, mediumpurple, pink); /* Gradient from purple to blue */
  color: white;
  text-align: center;
  padding: 80px 20px;
  font-family: sans-serif;
`;

const LastFooterTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const LastFooterSubtitle = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

function LastFooterComponent() {
  return (
    <LastFooter>
      <LastFooterTitle>Ready to elevate your game?</LastFooterTitle>
      <LastFooterSubtitle>
        Join thousands of players finding venues, events, and communities in your area.
      </LastFooterSubtitle>
    </LastFooter>
  );
}

export default LastFooterComponent;