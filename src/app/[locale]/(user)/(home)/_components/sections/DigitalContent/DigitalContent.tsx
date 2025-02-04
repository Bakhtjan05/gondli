'use client';

import React, { useState, useEffect } from 'react';
import './DigitalContent.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { useTranslations } from 'next-intl';

interface SlideData {
  title: string;
  imageSrc: string;
  rating: number;
  priceRange: string;
  minute: string;
}

const slideData: SlideData[] = [
  {
    title: 'Pilates Workshop',
    imageSrc: '/images/home/content1.svg',
    rating: 8.5,
    priceRange: '65 CHF',
    minute: '21 Minutes',
  },
  {
    title: 'Meditation Class',
    imageSrc: '/images/home/content2.svg',
    rating: 9.2,
    priceRange: '30 CHF',
    minute: '9 Minutes',
  },
  {
    title: 'Core Strength Workshop',
    imageSrc: '/images/home/content3.svg',
    rating: 8.4,
    priceRange: '25 CHF',
    minute: '10 Minutes',
  },
  {
    title: 'Meditation Class',
    imageSrc: '/images/home/content4.svg',
    rating: 8.4,
    priceRange: '45 CHF',
    minute: '11 Minutes',
  },
  {
    title: 'Pilates Workshop',
    imageSrc: '/images/home/content1.svg',
    rating: 8.5,
    priceRange: '65 CHF',
    minute: '20 Minutes',
  },
  {
    title: 'Meditation Class',
    imageSrc: '/images/home/content2.svg',
    rating: 9.2,
    priceRange: '25 CHF',
    minute: '21 Minutes',
  },
];
const DigitalContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();
  useEffect(() => {
    // Preload images before displaying the Swiper
    const preloadImages = () => {
      const imagePromises = slideData.map((item) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = item.imageSrc;
          img.onload = () => resolve();
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsLoading(false); // Hide loader when all images are loaded
      });
    };

    preloadImages();
  }, []);
  return (
    <div className='digitalContent'>
      <div className='container'>
        <div className='title'>
          <h2>{t('explore-content')}</h2>
        </div>
        {isLoading ? (
          <Loader className='sliderLoader' />
        ) : (
          <Swiper
            loop={true}
            slidesPerView={4}
            spaceBetween={15}
            navigation={true}
            speed={500}
            modules={[Navigation]}
            className='digitalContentSwiper'
            breakpoints={{
              1400: { slidesPerView: 4, spaceBetween: 15 },
              1000: { slidesPerView: 4, spaceBetween: 15 },
              600: { slidesPerView: 3, spaceBetween: 15 },
              0: { slidesPerView: 1, spaceBetween: 10, centeredSlides: false },
            }}
          >
            {slideData.map((item, index) => (
              <SwiperSlide key={index} className='swiper-slide'>
                <div className='image-wrapper'>
                  <div className='banner'>
                    <Image
                      priority
                      width={100}
                      height={100}
                      className='main-img'
                      src={item.imageSrc}
                      alt={item.title}
                    />
                    <Image
                      priority
                      width={32}
                      height={32}
                      className='heart'
                      src='/images/home/heart.svg'
                      alt='heart'
                    />
                  </div>
                  <div className='titleWrap'>
                    <h2 className='slide-title'>{item.title}</h2>
                    <span className='price'>{item.priceRange}</span>
                  </div>
                  <div className='info'>
                    <span className='rating'>
                      <Image
                        priority
                        width={12}
                        height={12}
                        src='/images/home/star.svg'
                        alt='star'
                      />{' '}
                      {item.rating}
                    </span>
                    <span className='minute'>{item.minute}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DigitalContent;
