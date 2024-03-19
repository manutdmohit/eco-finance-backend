import dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendEmail } from './sendgrid';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const port = process.env.PORT || 8000; // Use environment variable for port or default to 3000

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to the Homepage</h1>');
});

app.post('/api/send-email', async (req, res) => {
  // if (!to || !subject || !body) {
  //   return res.status(400).send('Missing required fields in request body');
  // }

  const data = req.body;

  try {
    await sendEmail('saudmohit@gmail.com', 'test', data);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
