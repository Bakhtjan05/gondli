'use client';

import React, { useState, useEffect } from 'react';
import './Recommended.scss';
import { useLocale } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import { useTranslations } from 'next-intl';
import axios from '@/lib/axios';
import Link from 'next/link';

interface SlideData {
  id: number;
  title: string;
  imageSrc: string;
  rating: number;
  priceRange: string;
  location: string;
  services: string[];
}


const Recommended: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  const [serviceData, setServiceData] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(`/api/service-providers`);

        const transformedData = response.data.map((provider: any) => ({
          id: provider.id,
          title: provider.name,
          imageSrc: provider.image || '/images/home/for1.svg',
          rating: provider.rating || 0,
          priceRange: '$$$$',
          location: provider.city || provider.location || 'Unknown',
          services: provider.services?.map((s: any) => s.name) || [],
        }));

        setServiceData(transformedData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);


  return (
    <div className='recommended'>
      <div className='container'>
        <div className='title'>
          <h2>Recommended</h2>
        </div>

        {loading ? (
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
            {serviceData.map((item, index) => (
              <SwiperSlide key={index} className='swiper-slide'>
                <Link href={`/${locale}/wellness-service/${item.id}`}>
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
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div >
  );
};

export default Recommended;

