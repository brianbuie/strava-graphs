import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.json({ message: 'hello from api' });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Ready on port ${port}`));
