'use client';

import React from 'react';
import './Location.scss';
import { useTranslations } from 'next-intl';

const Location: React.FC = () => {
  const t = useTranslations();

  return (
    <div className='location'>
      <h2 className='font-medium'>{t('location')}</h2>
      <p className='max-lg:!text-sm'>{t('address')}</p>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10808.062410989867!2d8.513875599999999!3d47.37261395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a219f017771%3A0xe4891d7f6ec549df!2s8003%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2s!4v1729464824176!5m2!1sen!2s'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default Location;
