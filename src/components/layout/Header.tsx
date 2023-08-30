import React from 'react';

const Header = () => {
  return (
    <header className="">
      <h2 className="font-agua text-primary-700 text-5xl font-bold">
        {/* CompCloud */}
        Image Optimizer
      </h2>
      <p className="text-gray-600 mt-3 text-md">
        {' '}
        A simple solution to optimize your images and easy upload to S3 Bucket.
      </p>
    </header>
  );
};

export default Header;
