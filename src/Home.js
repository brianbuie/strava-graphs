import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as StravaIcon } from './static/strava-symbol.svg';
import { AuthContext } from './Auth';

const AppLogo = styled(StravaIcon)`
  height: 20vmin;
  pointer-events: none;
  polygon {
    fill: ${({ theme }) => theme.white};
  }
`;

const Home = () => {
  const { fetchStrava } = useContext(AuthContext);
  fetchStrava('/v3/athlete').then(console.log);
  return (
    <>
      <AppLogo />
      <p>Strava Graphs</p>
    </>
  );
};

export default Home;
