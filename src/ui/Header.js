import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StravaIcon } from '../static/strava-symbol.svg';

const AppLogo = styled(StravaIcon)`
  height: 20vmin;
  pointer-events: none;
  polygon {
    fill: ${({ theme }) => theme.white};
  }
`;

const Header = () => (
  <>
    <AppLogo />
    <p>Strava Graphs</p>
  </>
);

export default Header;
