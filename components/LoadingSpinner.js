
import React from 'react';
import { Circles } from 'react-loader-spinner';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <Circles color="#00BFFF" height={80} width={80} />
  </div>
);

export default LoadingSpinner;
