'use client'; // Add this line at the top of the file

import React from 'react';
import './ReferralsCoupons.scss';
import { Yoga } from '@/icons';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ReferralsCoupons() {
  const coupons = [
    {
      title: 'Yoga Discount',
      code: 'G62VSF36',
      description: 'Enjoy 10% off your next yoga class booking',
    },
    {
      title: 'Yoga Discount',
      code: '74SAHG3C',
      description: 'Enjoy 10% off your next yoga class booking',
    },
  ];

  const referredUsers = [
    {
      name: 'John Bogan',
      email: 'Darius_Breitenberg@yahoo.com',
      image: '/images/content/user1.svg',
    },
    {
      name: 'Tracy Lueilwitz',
      email: 'Eleonore.Hickle@gmail.com',
      image: '/images/content/user5.svg',
    },
    {
      name: 'Danielle Carroll',
      email: 'Angela_Hoeger40@hotmail.com',
      image: '/images/content/user2.svg',
    },
    {
      name: 'Noel Abernathy',
      email: 'Orie64@gmail.com',
      image: '/images/content/user3.svg',
    },
    {
      name: 'April Block',
      email: 'Ansley_Heathcote@yahoo.com',
      image: '/images/content/user4.svg',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const t = useTranslations();

  return (
    <div className='referralsCoupons'>
      <div className='title'>
        <h2>Referrals & Coupons</h2>
      </div>
      <div className='section'>
        <h2>
          {t('availableCoupons')} ({coupons.length})
        </h2>
        <div className='couponList'>
          {coupons.map((coupon, index) => (
            <div key={index} className='couponItem'>
              <div className='couponInfo'>
                <div>
                  <Yoga />
                </div>
                <div className='info'>
                  <p className='title'>{coupon.title}</p>
                  <p className='description'>{coupon.description}</p>
                </div>
                <div className='code' onClick={() => handleCopy(coupon.code)}>
                  {coupon.code} <span className='copyText'>Copy</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='section'>
        <h2>
          {t('referredUsers')} ({referredUsers.length})
        </h2>
        <div className='userList'>
          {referredUsers.map((user, index) => (
            <div key={index} className='userItem'>
              <img src={user.image} alt={user.name} className='userImage' />
              <div className='userInfo'>
                <p className='name'>{user.name}</p>
                <p className='email'>{user.email}</p>
              </div>
              <Button className='followButton'>Follow</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
