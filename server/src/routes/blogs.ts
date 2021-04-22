import express from 'express';
import { getBlogs, addBlog, getBlog, deleteBlog } from '../controllers/blogs';

const router = express.Router();

router.get('/', getBlogs);
router.post('/create-blog', addBlog);
router.get('/:id', getBlog);
router.delete('/:id', deleteBlog);

export default router;
