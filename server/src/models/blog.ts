// this file is responsible for creating schema for blog posts
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// first arg is the desired schema,
// 2nd arg is props provided by mongoose (so here mongoose will add a timestamp)
// mongoose also automatically adds a unique id to each entry
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// name of model ('Blog') is IMPORTANT
// when mongoose talks with db, it will pluralize the name
// and connect with that collection
// ex: here we will be using 'blogs' collection since the name we provided is 'Blog'
// since mongoose is NOT case sensitive it will use 'blogs' collection
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
