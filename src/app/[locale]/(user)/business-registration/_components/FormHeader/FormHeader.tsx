import React from 'react';
import './formheader.scss';

type formHeaderProps = { title: string; desc: string };

const FormHeader = ({ title, desc }: formHeaderProps) => {
  return (
    <div className='form-header'>
      <h3 className='form-header-title max-lg:!text-2xl'>{title}</h3>
      <p className='form-header-desc max-lg:!text-sm'>{desc}</p>
    </div>
  );
};

export default FormHeader;
