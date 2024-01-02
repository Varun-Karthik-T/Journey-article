import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-500 p-4 text-white flex justify-between items-center rounded-lg">
      <div className="flex items-center">   
        <img
          src="/icon.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="font-bold text-lg">Journey - Your hub for user-written articles</span>
      </div>
      <div>
        <p>&copy; JOURNEY - All Rights Reserved 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
