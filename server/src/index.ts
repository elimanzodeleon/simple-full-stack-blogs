import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Blog from './models/blog';
import blogsRouter from './routes/blogs';

// needed for access to env variables (env vars must be in '.env' file)
dotenv.config();

// create server
const app = express();

// connect to db -> 2nd arg is so we don't get deprecation warnings
mongoose
  .connect(process.env.DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('connected to db');

    // IMPORTANT: we only want the server to begin listening once we have connected to the db
    // this will prevent users from trying to access db when we server has yet to connect
    app.listen(3500, () => {
      console.log('dinners ready');
    });
  })
  .catch((err) => {
    console.log(`unable to connect to db ${err}`);
  });

// global middleware
app.use(express.json());
app.use(cors());

// middleware applied to routes beginning with '/blogs'
app.use('/blogs', blogsRouter);
