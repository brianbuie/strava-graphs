import React from 'react';
import { Redirect } from 'react-router';
import { parse as parseQuery, stringify as stringifyQuery } from 'query-string';
import { Button } from './ui';

const STRAVA_AUTH_STORAGE_KEY = 'stravaAuth';

export const AuthContext = React.createContext({});

function getLocalAuth() {
  const savedAuth = localStorage.getItem(STRAVA_AUTH_STORAGE_KEY);
  return savedAuth ? JSON.parse(savedAuth) : {};
}

async function fetchStrava(endpoint = '', options = {}) {
  const givenQuery = options.query || {};
  const appendQuery = getLocalAuth();
  const queryString = stringifyQuery({ ...givenQuery, ...appendQuery });
  const url = `${process.env.REACT_APP_API_ENDPOINT}/strava${endpoint}?${queryString}`;
  const res = await fetch(url, { ...options }).then(res => res.json());
  if (res.updateAuth) {
    console.log('saving new Auth');
    localStorage.setItem(STRAVA_AUTH_STORAGE_KEY, JSON.stringify(res.updateAuth));
    return fetchStrava(endpoint, options);
  }
  return res;
}

const NeedAuth = () => (
  <a href={`${process.env.REACT_APP_API_ENDPOINT}/strava/connect`}>
    <Button theme="strava" label="Connect to Strava" />
  </a>
);

export const AuthProvider = ({ children }) => {
  const { access_token } = getLocalAuth();
  return access_token ? (
    <AuthContext.Provider value={{ fetchStrava }}>{children}</AuthContext.Provider>
  ) : (
    <NeedAuth />
  );
};

export const SaveAuth = ({ location }) => {
  const authData = parseQuery(location.search);
  localStorage.setItem(STRAVA_AUTH_STORAGE_KEY, JSON.stringify(authData));
  return <Redirect to="/" />;
};
