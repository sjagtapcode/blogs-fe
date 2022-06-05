import React, { useEffect } from 'react';

const Blogs = () => {
  useEffect(() => {
    console.log('blogs');
  }, []);
  return (
    <div>
      <h2>Blogs</h2>
      <div>Coming Soon!</div>
    </div>
  );
};

export default Blogs;
