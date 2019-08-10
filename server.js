import path from 'path';
import express from 'express';
import proxy from 'express-request-proxy';
import cors from 'cors';
import fetch from 'node-fetch';
import { stringify } from 'query-string';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

// Allow requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_HOST
  })
);

// Force https
app.use((req, res, next) => {
  // exit if we're in development
  if (!isProd) return next();

  // exit if we're on localhost (staging)
  if (req.connection.localAddress === req.connection.remoteAddress) return next();

  // exit if already https
  if (req.header('x-forwarded-proto') === 'https') return next();

  // redirect to https
  res.redirect(`https://${req.header('host')}${req.url}`);
});

app.use('/api/strava/connect', (req, res, next) => {
  return res.redirect(
    `http://www.strava.com/oauth/authorize?client_id=${
      process.env.STRAVA_CLIENT_ID
    }&response_type=code&redirect_uri=${
      process.env.REACT_APP_API_ENDPOINT
    }/strava/callback&approval_prompt=force&scope=read`
  );
});

async function getAccessToken(query) {
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

app.use('/api/strava/callback', async (req, res, next) => {
  const query = await getAccessToken({
    code: req.query.code,
    grant_type: 'authorization_code'
  });
  res.redirect(`${process.env.CLIENT_HOST}/auth?${stringify(query)}`);
});

app.use('/api/strava/*', async (req, res, next) => {
  const { expires_at, refresh_token, access_token } = req.query;
  // refresh token
  const now = Math.floor(new Date() / 1000);
  if (now > expires_at) {
    const updateAuth = await getAccessToken({
      grant_type: 'refresh_token',
      refresh_token
    });
    if (updateAuth.access_token !== access_token) return res.send({ updateAuth });
  }
  console.log(Math.floor((expires_at - now) / 60) + ' minutes until expiration');
  if (!access_token) return res.status(401).send('Need Strava Auth');
  req.headers['Authorization'] = `Bearer ${access_token}`;
  delete req.query.expires_at;
  delete req.query.refresh_token;
  delete req.query.access_token;
  return next();
});

app.use(
  '/api/strava/*',
  proxy({
    url: 'https://www.strava.com/api/*'
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Ready on port ${port}`));
