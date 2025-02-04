import React from 'react';
import './LocationServices.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
const LocationServices: React.FC = () => {
  const t = useTranslations();
  return (
    <React.Fragment>
      <div
        className='locationServices'
        style={{
          backgroundImage: `url('/images/home/locationServices.svg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '350px',
          padding: '60px 0',
        }}
      >
        <div className='container'>
          <div className='content'>
            <Image
              priority
              width={60}
              height={60}
              src='/images/home/LocationMarker.svg'
              alt='LocationMarker'
            />
            <h2>{t('turn-location')}</h2>
            <p>{t('activate-location')}</p>
            <div className='buttons'>
              <button>{t('nearby')}</button>
              <button>{t('not-now')}</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LocationServices;
