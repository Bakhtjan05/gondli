'use client';

import React, { useState } from 'react';
import './Amenities.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Amenities: React.FC = () => {
  const t = useTranslations();

  const amenitiesData = [
    {
      src: '/images/services/amenities1.svg',
      alt: 'amenities-parking',
      textKey: 'free_parking',
    },
    {
      src: '/images/services/amenities3.svg',
      alt: 'amenities-wifi',
      textKey: 'wifi',
    },
    {
      src: '/images/services/amenities2.svg',
      alt: 'amenities-ac',
      textKey: 'air_conditioned_spaces',
    },
    {
      src: '/images/services/amenities4.svg',
      alt: 'amenities-hydration',
      textKey: 'hydration_stations',
    },
    {
      src: '/images/services/amenities5.svg',
      alt: 'amenities-lounge',
      textKey: 'cozy_lounge',
    },
    {
      src: '/images/services/amenities6.svg',
      alt: 'amenities-bar',
      textKey: 'indoor_bar',
    },
    {
      src: '/images/services/amenities7.svg',
      alt: 'amenities-pet',
      textKey: 'pet_friendly_policy',
    },
  ];

  const [highlighted, setHighlighted] = useState<number[]>([]);

  const toggleHighlight = (index: number) => {
    setHighlighted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className='amenities'>
      <div className='amenities-header'>
        <h2>{t('amenities-title')}</h2>
        <p>{t('amenities-description')}</p>
      </div>
      <div className='amenities-grid'>
        {amenitiesData.map((amenity, index) => (
          <div
            className={`amenity-card ${highlighted.includes(index) ? 'highlight' : ''}`}
            key={index}
          >
            <div className='amenity-icons'>
              <Image
                priority
                src={amenity.src}
                width={20}
                height={20}
                alt={t(amenity.alt)}
                className='amenity-icon'
              />
              <input
                type='checkbox'
                className='checkbox'
                checked={highlighted.includes(index)}
                onChange={() => toggleHighlight(index)}
                aria-label={t('toggle-amenity', {
                  amenity: t(amenity.textKey),
                })}
              />
            </div>
            <p className='amenity-label'>{t(amenity.textKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
