import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { BlogProps, Blog } from '../../interfaces';
import { useRouter } from 'next/router';

const SingleBlog: React.FC<BlogProps> = (props) => {
  const { _id, title, snippet, body } = props.blog;

  const router = useRouter();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3500/blogs/${_id}`)
      .then((res) => {
        router.push('/blogs');
      })
      .catch((err) => {
        console.log('unable to delete blog');
      });
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className='blog-list'>
        <h1 className='title'>{title}</h1>
        <h3>{snippet}</h3>
        <p>{body}</p>
        <div className='blog-footer'>
          <Link href='/blogs'>
            <a>back</a>
          </Link>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const blogId = context.query.id;
  const result = await axios.get(`http://localhost:3500/blogs/${blogId}`);
  const blog = result.data.data.result;

  return { props: { blog } };
};

export default SingleBlog;
