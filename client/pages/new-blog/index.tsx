import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();

  const submitBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${JSON.stringify({ title, snippet, body })} sent to server`);
    router.push('/blogs');

    axios
      .post('http://localhost:3500/create-blog', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          title,
          snippet,
          body,
        },
      })
      .then((res) => {
        console.log('successfully posted story to server', res);
      })
      .catch((err) => {
        console.log(`unable to submit post: ${err}`);
      });
  };

  return (
    <div>
      <Head>
        <title>Create New Blog</title>
      </Head>
      <Navbar />
      <form onSubmit={submitBlog} className='form'>
        <input
          type='text'
          name={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title'
          required
        />
        <input
          type='text'
          name={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          placeholder='snippet'
          required
        />
        <textarea
          name={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='body'
          required
        />
        <button type='submit'>post</button>
      </form>
    </div>
  );
};

export default NewBlog;
