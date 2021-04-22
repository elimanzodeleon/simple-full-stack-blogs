import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar />
      <h1 className='title'>boring blogs</h1>
    </div>
  );
};

export default Home;
