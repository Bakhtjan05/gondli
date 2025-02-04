import React from 'react';
import './ChoosenInfo.scss';

interface Props {}

const ChoosenInfo: React.FC<Props> = () => {
  return (
    <div className='choosen-info'>
      <div className='choosen-block'>
        <div>
          <p>Gentle Flow Yoga Class</p>
          <p>Chosen Service</p>
        </div>
        <div>
          <img src='/images/booking/edit.svg' alt='' />
          <p>Edit</p>
        </div>
      </div>
      <div className='choosen-block'>
        <div>
          <p>Gentle Flow Yoga Class</p>
          <p>Chosen Date</p>
        </div>
        <div>
          <img src='/images/booking/edit.svg' alt='' />
          <p>Edit</p>
        </div>
      </div>
      <div className='choosen-block'>
        <div>
          <p>Gentle Flow Yoga Class</p>
          <p>Chosen Start Time</p>
        </div>
        <div>
          <img src='/images/booking/edit.svg' alt='' />
          <p>Edit</p>
        </div>
      </div>
    </div>
  );
};

export default ChoosenInfo;
