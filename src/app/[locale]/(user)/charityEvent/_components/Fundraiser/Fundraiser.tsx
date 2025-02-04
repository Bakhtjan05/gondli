'use client';

import React from 'react';
import './Fundraiser.scss';
import { useTranslations } from 'next-intl';

const Fundraiser: React.FC = () => {
  const t = useTranslations();

  return (
    <div className='fundraiser'>
      <div className='donate'>
        <input type='text' placeholder='0' />
        <p>{t('karma-amout')}</p>
        <span>340 {t('coins-available')}</span>
        <div className='line'></div>
        <input type='text' placeholder='0' />
        <p>{t('equivalent')} CHF</p>
        <span>50 {t('karma-coins')} = 1 CHF</span>
      </div>
      <button>{t('became-fundraiser')}</button>
    </div>
  );
};

export default Fundraiser;
