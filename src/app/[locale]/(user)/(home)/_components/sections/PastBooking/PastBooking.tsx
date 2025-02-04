'use client';

import React, { useState, useEffect } from 'react';
import './PastBooking.scss';
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
  location: string;
  services: string[];
}

const slideData: SlideData[] = [
  {
    title: 'Harmony Haven Wellness Center',
    imageSrc: '/images/home/booking1.svg',
    rating: 8.5,
    priceRange: '$$$$',
    location: 'Seefeld',
    services: ['Spa', 'Yoga', 'Detox'],
  },
  {
    title: 'Serenity Spa Retreat',
    imageSrc: '/images/home/booking2.svg',
    rating: 9.2,
    priceRange: '$$$$',
    location: 'Engel',
    services: ['Massage', 'Meditation', 'Workshops'],
  },
  {
    title: 'Pure Pilates Oasis',
    imageSrc: '/images/home/booking3.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Altdetten',
    services: ['Pilates', 'Core Strength', 'Nutrition'],
  },
  {
    title: 'Renewal Fitness Hub',
    imageSrc: '/images/home/booking4.svg',
    rating: 8.4,
    priceRange: '$$$$',
    location: 'Oerlikon',
    services: ['Fitness', 'Pilates', 'Yoga'],
  },
  {
    title: 'Harmony Haven Wellness Center',
    imageSrc: '/images/home/booking1.svg',
    rating: 8.5,
    priceRange: '$$$$',
    location: 'Seefeld',
    services: ['Spa', 'Yoga', 'Detox'],
  },
  {
    title: 'Serenity Spa Retreat',
    imageSrc: '/images/home/booking2.svg',
    rating: 9.2,
    priceRange: '$$$$',
    location: 'Engel',
    services: ['Massage', 'Meditation', 'Workshops'],
  },
];

const PastBooking: React.FC = () => {
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
    <div className='pastBooking'>
      <div className='container'>
        <div className='title'>
          <h2>{t('past-booking')}</h2>
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
            className='pastBookingSwiper'
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
                    <div className='favorite'>
                      <Image
                        priority
                        width={32}
                        height={32}
                        src='/images/home/heat.svg'
                        alt='heat'
                      />
                      <span>Users Favorite</span>
                    </div>
                  </div>
                  <h2 className='slide-title'>{item.title}</h2>
                  <div className='additional-info'>
                    <div className='service'>
                      {item.services.map((service, i) => (
                        <span key={i}>{service}</span>
                      ))}
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
                      <span className='price'>{item.priceRange}</span>
                      <span className='location'>{item.location}</span>
                    </div>
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

export default PastBooking;
