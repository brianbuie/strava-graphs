import path from 'path';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import stravaRoutes from './api/strava';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

// Allow requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true
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

app.use('/api/strava', stravaRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    stack: !isProd ? err.stack : ''
  };
  return res.status(error.status).json(error);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Ready on port ${port}`));
