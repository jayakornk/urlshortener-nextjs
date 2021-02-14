import React from 'react';

export const Footer = (): JSX.Element => {
  return (
    <footer className="w-full py-6 leading-none text-center text-gray-500 bg-gray-800">
      &copy; {new Date().getFullYear()}{' '}
      <a href="https://jayakornk.dev">JayakornK</a>. All rights reserved.
    </footer>
  );
};
