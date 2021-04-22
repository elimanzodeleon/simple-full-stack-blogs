import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Blog from './models/blog';
// const { Blog } = require('./models/blog');

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

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`hi hehe`);
});

app.get('/blogs', (req: Request, res: Response) => {
  // fetch all blogs from Blog model in db
  // remeber, since mongo ignores case, and pluralizes the word, it looks for 'blogs' table
  Blog.find()
    .sort({ createdAt: -1 }) // sort by createdAt value
    .then((result: Array<Object>) => {
      res.status(200).json({ success: true, data: { result } });
    })
    .catch((error: Object) => {
      console.log(error);
    });
});

app.get('/blogs/:id', (req: Request, res: Response) => {
  const blogId = req.params.id;
  // fetch single blog from blogs db with req id in url params
  Blog.findById(blogId)
    .then((result: Object) => {
      res.status(200).json({ success: true, data: { result } });
    })
    .catch((error: Object) => {
      res.status(404).json({
        success: false,
        message: 'no matching id found in our records',
      });
      console.log(error);
    });
});

app.delete('/blogs/:id', (req: Request, res: Response) => {
  const blogId = req.params.id;
  // fetch single blog from blogs db with req id in url params
  Blog.findByIdAndDelete(blogId)
    .then((result: Object) => {
      res.status(200).json({ success: true, data: { result } });
    })
    .catch((error: Object) => {
      res.status(404).json({
        success: false,
        message: 'no matching id found in our records',
      });
      console.log(error);
    });
});

interface blogProps {
  title: string;
  snippet: string;
  body: string;
}

app.post('/create-blog', (req: Request, res: Response) => {
  // grab blog items from request body
  const { title, snippet, body }: blogProps = req.body.data;

  // create a new Blog instance with data from client
  // so that we can create a new blog doc in db
  const blog = new Blog({
    title,
    snippet,
    body,
  });

  blog
    .save()
    .then((result: Object) =>
      res.status(201).json({ success: true, data: result })
    )
    .catch((err: Object) =>
      res.status(400).json({ success: false, data: err })
    );
});
