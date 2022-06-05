import React, { useEffect } from 'react';

const CreateBlog = () => {
  useEffect(() => {
    console.log('create blogs');
  }, []);

  return (
    <div>
      <h2>CreateBlog</h2>
      <div>Coming Soon!</div>
    </div>
  );
};

export default CreateBlog;
