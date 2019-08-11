import React, { useState, useEffect } from 'react';
import fetch from './utils/fetch';

export const StravaContext = React.createContext({});

export const StravaProvider = ({ children }) => {
  const [status, setStatus] = useState('LOADING');
  const [user, setUser] = useState({});

  function fetchStrava(endpoint = '') {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/strava${endpoint}`);
  }

  function disconnect() {
    return fetchStrava('/disconnect').then(() => {
      setStatus('UNAUTHENTICATED');
      setUser({});
    });
  }

  useEffect(() => {
    fetchStrava('/v3/athlete').then(({ ok, status, data }) => {
      if (status === 401) return setStatus('UNAUTHENTICATED');
      if (!ok) return setStatus('ERROR');
      setUser(data);
      setStatus('AUTHENTICATED');
    });
  }, []);

  return (
    <StravaContext.Provider value={{ user, status, disconnect, fetchStrava }}>
      {children}
    </StravaContext.Provider>
  );
};
