import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StravaContext } from '../StravaContext';
import { Button, Modal } from './index';

const UserImage = styled.img`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.stravaOrange};
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  height: 3rem;
`;

const UserBadge = () => {
  const { user, disconnect, status } = useContext(StravaContext);
  if (status === 'UNAUTHENTICATED') {
    return (
      <Button
        theme="strava"
        label="Connect to Strava"
        size="0.6rem"
        withLink={{ href: `${process.env.REACT_APP_API_ENDPOINT}/strava/connect` }}
      />
    );
  }
  if (status === 'AUTHENTICATED' && user) {
    const name = `${user.firstname} ${user.lastname}`;
    return (
      <Modal
        title={name}
        overlayDismiss
        Launcher={openModal => <UserImage src={user.profile} onClick={openModal} />}
      >
        {closeModal => (
          <Button
            theme="strava"
            label="Disconnect"
            grow
            onClick={() => {
              disconnect();
              closeModal();
            }}
          />
        )}
      </Modal>
    );
  }
  return null;
};

const Menu = () => (
  <Nav>
    <Link to="/">Strava Graphs</Link>
    <UserBadge />
  </Nav>
);

export default Menu;
