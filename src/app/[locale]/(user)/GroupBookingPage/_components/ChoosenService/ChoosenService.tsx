import Image from 'next/image';
import React from 'react';
import './ChoosenService.scss';

interface Props { }

const ChoosenService: React.FC<Props> = () => {
  const serviceData = [
    {
      productName: 'Harmony Haven Wellness Center',
      productImgUrl: "/images/services/mainBanner.jpg", 
      categories: [
        { name: 'Spa' },
        { name: 'Yoga' },
        { name: 'Fitness' },
        { name: 'Defox' },
      ],
      rating: '8.5',
      location: 'Seefeld',
    },
  ];
  return (
    <div className='service max-lg:flex-col'>
      <div className='max-lg:relative img-side !h-full'>
        <Image className='main-img max-w-[126px] h-[126px] max-lg:!max-w-full object-cover' src={serviceData[0].productImgUrl} alt="avatar" width={500} height={500} />
        <div className='absolute flex gap-3 top-3 right-4'>
          <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
            <Image src={"/images/icons/wellness-heart.svg"} alt='' width={16} height={16} />
          </div>
        </div>
      </div>
      <div className='info-side-texts'>
        <p>{serviceData[0].productName}</p>
        <p>
          {serviceData[0].categories.map((category, index) => (
            <span key={index}>
              {category.name}
              {index < serviceData[0].categories.length - 1 && (
                <span className='dot'> </span>
              )}
            </span>
          ))}
        </p>
        <div className='rating'>
          <p>
            <Image
              src='/images/booking/star.svg'
              alt='star'
              width={12}
              height={12}
            />{' '}
            {serviceData[0].rating}{' '}
          </p>
          <div className='dot'></div>
          <p>
            $$<span>$$</span>
          </p>
          <div className='dot'></div>
          <p>{serviceData[0].location}</p>
        </div>
      </div>
    </div>
  );
};

export default ChoosenService;
