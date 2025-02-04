'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import './discount.scss';

const Discount: React.FC = () => {
  const t = useTranslations();

  return (
    <React.Fragment>
      <div className='discount max-lg:!p-4'>
        <div className='discountWrapper max-lg:flex-col max-lg:!gap-5'>
          <div className='content max-lg:order-2'>
            <h2 className='max-lg:!text-base !font-bold'>{t('dashboard-discount-title')}</h2>

            <p className='max-lg:!text-sm max-lg:!mb-6'>{t('dashboard-discount-description')}</p>

            <div className='buttons'>
              <button className='max-lg:!text-sm'>{t('dashboard-discount-button')}</button>
            </div>
          </div>

          <div className=''>
            <Image
              priority
              width={145}
              height={145}
              src='/images/dashboard/discount.svg'
              alt='Discount'
              className='max-lg:w-24'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Discount;
