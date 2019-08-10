import React from 'react';
import styled from 'styled-components';
import { Button, Theme } from './ui';
import logo from './logo.svg';

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

function App() {
  const host = process.env.REACT_APP_API_ENDPOINT;
  fetch(host).then(res => res.json().then(console.log));
  return (
    <Theme>
      <>
        <AppLogo src={logo} alt="logo" />
        <p>Strava Graphs</p>
        <Button theme="strava" label="Connect to Strava" />
      </>
    </Theme>
  );
}

export default App;
