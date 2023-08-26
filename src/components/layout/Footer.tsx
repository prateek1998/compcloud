import React from 'react';

const Footer = () => {
  return (
    <footer className="h-12 font-body flex items-center">
      <p className="text-xl w-screen sticky bottom-0 text-gray-600 bottom-0 text-center">
        © {new Date().getFullYear()}, Made with ❤️ by
        <span className="font-alex ml-1 text-2xl text-primary-500 font-bold tracking-wide">
          Prateek Saini
        </span>
      </p>
    </footer>
  );
};

export default Footer;
