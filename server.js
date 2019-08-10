import express from 'express';
import cors from 'cors';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (!isProd) return next();
  // we're on localhost
  if (req.connection.localAddress === req.connection.remoteAddress) return next();
  // already using https
  if (req.header('x-forwarded-proto') === 'https') return next();
  // redirect to https
  res.redirect(`https://${req.header('host')}${req.url}`);
});

app.use('/api', (req, res, next) => {
  res.json({ message: 'hello from api' });
});

app.use(express.static('client/public'));
app.use(express.static('client/public/dist'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Ready on port ${port}`));
