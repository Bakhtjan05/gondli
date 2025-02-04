'use client';

import React, { useEffect, useState } from 'react';
import './Recommended.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import axios from '@/lib/axios';
import Link from 'next/link';

interface SlideData {
  id: number,
  title: string;
  imageSrc: string;
  rating: number;
  descripion: string;
  priceRange: string;
  city: string;
  location: string;
  services: string[];
}



const Recommended: React.FC = () => {
  const [serviceData, setServiceData] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();



  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(`/api/service-providers`);
        const transformedData = response.data.map((provider: any) => ({
          id: provider.id,
          title: provider.name,
          imageSrc: '/images/home/for1.svg', // Укажите путь к изображению по умолчанию, если отсутствует
          rating: provider.rating || 0,
          descripion: provider.description,
          priceRange: '$$$$',
          location: provider.location || 'Unknown',
          services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
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
          <h2>{t('recommended')}</h2>
          <button>
            <Image
              priority
              width={20}
              height={20}
              src='/images/home/filter.svg'
              alt='filter'
            />{' '}
            Filter
          </button>
        </div>
        <div className='row'>
          {serviceData.map((item, index) => (
            <div key={index} className='col-lg-3 col-md-4 md-mb-5 mb-4 px-2'>
              <Link href={`/${locale}/wellness-service/${index + 1}`} passHref>
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
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Recommended;
