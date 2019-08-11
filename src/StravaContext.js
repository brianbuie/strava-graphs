import React, { useState, useEffect } from 'react';

export const StravaContext = React.createContext({});

export const StravaProvider = ({ children }) => {
  const [status, setStatus] = useState('LOADING');
  const [user, setUser] = useState({});

  function fetchStrava(endpoint = '') {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/strava${endpoint}`, {
      credentials: 'include'
    });
  }

  useEffect(() => {
    fetchStrava('/v3/athlete')
      .then(res => {
        if (res.status === 401) {
          return setStatus('UNAUTHENTICATED');
        }
        res.json().then(res => {
          setStatus('AUTHENTICATED');
          setUser(res);
        });
      })
      .catch(err => {
        setStatus('ERROR');
      });
  }, []);

  return (
    <StravaContext.Provider value={{ user, status, fetchStrava }}>
      {children}
    </StravaContext.Provider>
  );
};
