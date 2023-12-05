import React from 'react';
import { MdOutlineWifiOff } from 'react-icons/md'; 

const NoConnection = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <MdOutlineWifiOff className="text-6xl mb-4 text-red-500" />
      <h1 className="text-3xl font-bold mb-2">No Internet Connection</h1>
      <p className="text-lg mb-8">
        Please check your network connection and try again.
      </p>
      <p className="text-sm text-gray-500">© 2023 DLSMS</p>
    </div>
  );
};

export default NoConnection;
