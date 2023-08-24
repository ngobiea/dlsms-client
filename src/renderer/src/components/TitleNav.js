import React from 'react';
import '../../public/css/App.css';
const TitleNav = () => {
  return (
    <nav className="h-10 fixed w-screen top-0 left-0 z-50 bg-title titleD">
      <span className="self-center text-xl pl-2  font-semibold  whitespace-nowrap text-white">
        DLSMS
      </span>
    </nav>
  );
};

export default TitleNav;
