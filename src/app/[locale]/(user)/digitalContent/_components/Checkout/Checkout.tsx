'use client';

import React, { useState } from 'react';
import './Checkout.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Checkout: React.FC = () => {
  const t = useTranslations();
  const [isOneTime, setIsOneTime] = useState(false); // State for One-time Payment checkbox
  const [isSubscription, setIsSubscription] = useState(false); // State for Subscription checkbox

  const handleOneTimeChange = () => {
    setIsOneTime(!isOneTime);
    setIsSubscription(false); // Uncheck Subscription if One-time is checked
  };

  const handleSubscriptionChange = () => {
    setIsSubscription(!isSubscription);
    setIsOneTime(false); // Uncheck One-time if Subscription is checked
  };

  return (
    <div className='checkout'>
      <div className='title'>
        <h2>65 CHF</h2>
        <p>{t('one-time')}</p>
      </div>
      <div className='subscription'>
        <p>
          {t('activate')} <Link href='/'>{t('subscription')}</Link>{' '}
          {t('class-list')}
        </p>
      </div>
      <div className='paymentMethod'>
        <p className='method'>Payment Method</p>
        <div className='checkboxes'>
          <label className='custom-checkbox'>
            <input
              type='checkbox'
              checked={isOneTime}
              onChange={handleOneTimeChange}
            />
            <span className='checkmark'></span>
            {t('one-time')}
          </label>
          <label className='custom-checkbox'>
            <input
              type='checkbox'
              checked={isSubscription}
              onChange={handleSubscriptionChange}
            />
            <span className='checkmark'></span>
            {t('subscription')}
          </label>
        </div>
      </div>
      <button>{t('checkout')}</button>
    </div>
  );
};

export default Checkout;
