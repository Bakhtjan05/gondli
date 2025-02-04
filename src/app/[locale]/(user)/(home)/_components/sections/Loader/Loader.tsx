'use client';

import React from 'react';
import './Loader.scss';
import Image from 'next/image';

interface LoaderProps {
  className?: string; // Optional className prop
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`loader ${className ? className : ''}`}>
      {' '}
      {/* Append custom class if provided */}
      <Image
        priority
        width={50}
        height={50}
        src='/images/home/loader.svg'
        alt='loader'
      />
    </div>
  );
};

export default Loader;
