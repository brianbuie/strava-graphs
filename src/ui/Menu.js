import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StravaContext } from '../StravaContext';
import Button from './Button';

const UserImage = styled.img`
  max-width: 2.5rem;
  border-radius: 1.5rem;
  border: 4px solid ${({ theme }) => theme.stravaOrange};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
`;

const UserBadge = () => {
  const { user, status } = useContext(StravaContext);
  if (status === 'UNAUTHENTICATED') {
    return (
      <a href={`${process.env.REACT_APP_API_ENDPOINT}/strava/connect`}>
        <Button theme="strava" label="Connect to Strava" size="small" />
      </a>
    );
  }
  if (status === 'AUTHENTICATED' && user) {
    return <UserImage src={user.profile} />;
  }
  return null;
};

const Menu = () => (
  <Nav>
    <Link to="/">Graphs</Link>
    <UserBadge />
  </Nav>
);

export default Menu;
