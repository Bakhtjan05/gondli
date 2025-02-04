"use client"

import React from 'react';
import './Notification.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, selectUpcomingPageState } from '@/slices/upcomingPageSlice';

export default function NotificationSettings() {
  const notificationSettings = [
    {
      label: 'Story Updates',
      description:
        'Receive push notifications when your favorite venue uploads a new story',
    },
    {
      label: 'Booking Status',
      description:
        'Receive push notifications whenever the booking status changes',
    },
    {
      label: 'Discounts',
      description:
        'Get push notifications about discounts from the places you interact with',
    },
    {
      label: 'Personal Achievements',
      description:
        'Receive push notifications whenever you unlock a new badge or score a “Top Ambassador” badge',
    },
    {
      label: 'Friends Achievements',
      description:
        'Receive push notifications whenever your friends reach new badges or “Top Ambassador” badge',
    },
    {
      label: 'Comments',
      description:
        'Receive push notifications when venues answer your questions in comment sections',
    },
    {
      label: 'Gondli Updates',
      description:
        'Receive push notifications when Gondli introduces new and innovative features',
    },
  ];

  const dispatch = useDispatch();

  const t = useTranslations();

  const backToNavbar = () => {
    dispatch(setIsUpcomingPage(false))
  }

  return (
    <div className='notificationSettings'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>{t(`notifications`)}</h2>
      </div>

      <div className='notificationsList'>
        {notificationSettings.map((notification, index) => (
          <div key={index} className='notification'>
            <label className='notificationLabel'>
              <input type='checkbox' className='checkbox' />
              <span className='labelText'>{notification.label}</span>
            </label>
            <p className='description'>{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
