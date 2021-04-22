import { Request, Response } from 'express';
import Blog from '../models/blog';

export const getBlogs = (req: Request, res: Response) => {
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
};

interface blogProps {
  title: string;
  snippet: string;
  body: string;
}

export const addBlog = (req: Request, res: Response) => {
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
};

export const getBlog = (req: Request, res: Response) => {
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
};

export const deleteBlog = (req: Request, res: Response) => {
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
};
