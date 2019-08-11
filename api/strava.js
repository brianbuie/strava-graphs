import express from 'express';
import cache from 'memory-cache';
import fetch from 'node-fetch';
import { stringify } from 'query-string';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const api = express.Router();

async function getStravaOAuthToken(query) {
  const sendQuery = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    ...query
  };
  return fetch(`https://www.strava.com/oauth/token?${stringify(sendQuery)}`, {
    method: 'post'
  })
    .then(res => res.json())
    .then(({ expires_at, refresh_token, access_token }) => ({
      expires_at,
      refresh_token,
      access_token
    }));
}

api.use(cookieParser(), async (req, res, next) => {
  req.user = {};
  const { token } = req.cookies;
  if (!token) return next();
  const { expires_at, refresh_token, access_token } = jwt.verify(token, process.env.API_JWT_SECRET);
  if (!access_token || !refresh_token || !expires_at) return next();
  const now = Math.floor(new Date() / 1000);
  if (now > expires_at) {
    console.log('Refreshing access_token');
    const newAuth = await getStravaOAuthToken({
      grant_type: 'refresh_token',
      refresh_token
    });
    res.cookie('token', jwt.sign(newAuth, process.env.API_JWT_SECRET));
    req.user = newAuth;
  } else {
    req.user = { expires_at, refresh_token, access_token };
  }
  console.log(Math.floor((req.user.expires_at - now) / 60) + ' minutes until expiration');
  return next();
});

api.get('/connect', (req, res, next) => {
  return res.redirect(
    `http://www.strava.com/oauth/authorize?client_id=${
      process.env.STRAVA_CLIENT_ID
    }&response_type=code&redirect_uri=${
      process.env.REACT_APP_API_ENDPOINT
    }/strava/callback&approval_prompt=force&scope=read`
  );
});

api.get('/callback', async (req, res, next) => {
  const auth = await getStravaOAuthToken({
    code: req.query.code,
    grant_type: 'authorization_code'
  });
  res.cookie('token', jwt.sign(auth, process.env.API_JWT_SECRET));
  res.redirect(`${process.env.CLIENT_HOST}`);
});

api.use(async (req, res, next) => {
  const { access_token } = req.user;
  if (!access_token) return res.status(401).send({});
  const cacheLocation = `${access_token} ${req.path}`;
  const cachedResponse = cache.get(cacheLocation);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  try {
    console.log('fetching fresh response');
    const freshResponse = await fetch(`https://www.strava.com/api${req.path}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(_res => _res.json());
    cache.put(cacheLocation, freshResponse, 1000 * 60 * 5);
    res.json(freshResponse);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default api;
