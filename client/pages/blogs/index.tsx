import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { Props, Blog } from '../../interfaces';

const Blogs: React.FC<Props> = (props) => {
  const { blogs } = props;

  return (
    <div>
      <Head>
        <title>Blogs</title>
      </Head>
      <Navbar />
      <h1 className='title'>Blog Posts</h1>
      <div className='blog-list'>
        {blogs.map((blog) => {
          const { _id, title, snippet, body } = blog;
          return (
            <div key={_id}>
              <h1>{title}</h1>
              <h4>{snippet}</h4>
              <Link href={`/blogs/${_id}`}>
                <a>read more</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3500/blogs');
  const blogs: Blog[] = res.data.data.result;

  return { props: { blogs } };
};

export default Blogs;
