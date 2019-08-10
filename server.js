import path from 'path';
import express from 'express';
import cors from 'cors';

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

app.use('/api', (req, res, next) => {
  res.json({ message: 'hello from api' });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Ready on port ${port}`));
