import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link href='/'>
        <a>home</a>
      </Link>
      <Link href='/blogs'>
        <a>blogs</a>
      </Link>
      <Link href='/new-blog'>
        <a>+ new blog</a>
      </Link>
    </div>
  );
};

export default Navbar;
