import React, { useState, useEffect } from 'react';
import { Button } from './ui';

async function fetchStrava(endpoint = '') {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/strava${endpoint}`, {
    credentials: 'include'
  });
}

const Home = () => {
  const [status, setStatus] = useState('LOADING');

  useEffect(() => {
    fetchStrava('/v3/athlete')
      .then(res => {
        if (res.status === 401) {
          return setStatus('UNAUTHENTICATED');
        }
        res.json().then(res => {
          setStatus(`${res.firstname} ${res.lastname}`);
        });
      })
      .catch(err => {
        setStatus('ERROR');
      });
  }, []);

  switch (status) {
    case 'LOADING':
      return <p>Loading...</p>;
    case 'ERROR':
      return <p>Error!</p>;
    case 'UNAUTHENTICATED':
      return (
        <a href={`${process.env.REACT_APP_API_ENDPOINT}/strava/connect`}>
          <Button theme="strava" label="Connect to Strava" />
        </a>
      );
    default:
      return <p>{status}</p>;
  }
};

export default Home;
