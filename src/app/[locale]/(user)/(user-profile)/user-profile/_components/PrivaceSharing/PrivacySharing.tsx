"use client"


import React from 'react';
import './PrivacySharing.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, selectUpcomingPageState } from '@/slices/upcomingPageSlice';

export default function PrivacySharingSettings() {
  const dispatch = useDispatch();


  const privacySettings = [
    {
      label: 'Display My Full Name',
      description:
        'When turned On - your full name will be visible for others when you interact with them in comments, or reviews section. If you turn it off only your name and first letter will be visible in sections mentioned above.',
    },
    {
      label: 'Show off My Achievement Badge',
      description:
        'When turned On - your achievement badge (Yoga Enthusiast) will be visible for others when you interact with them in comments, or reviews section. If you turn it off there will be no badge visible for other users.',
    },
    {
      label: 'Show off My Top Ambassador Badge',
      description:
        'When turned On - your Top Ambassador Badge will be visible for others in “Venue Insights” Information. If you turn it off there will be no badge visible for other users.',
    },
  ];

  const t = useTranslations();

  const backToNavbar = () => {
    dispatch(setIsUpcomingPage(false))
  }

  return (
    <div className='privacySettings'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>{t(`privacyAndSharing`)}</h2>
      </div>

      <div className='settingsList'>
        {privacySettings.map((setting, index) => (
          <div key={index} className='setting'>
            <label className='settingLabel'>
              <input type='checkbox' className='checkbox' />
              <span className='labelText'>{setting.label}</span>
            </label>
            <p className='description'>{setting.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
