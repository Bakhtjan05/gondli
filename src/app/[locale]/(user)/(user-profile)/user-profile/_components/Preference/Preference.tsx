"use client"


import React from 'react';
import './Preference.scss';
import { Edit } from '@/icons';
import { useTranslations } from 'next-intl';
import { useUpcomingPage } from '../../UpcomingPageContext';
import Image from 'next/image';

export default function PreferencSetting() {

  const { isUpcomingPage, setIsUpcoming } = useUpcomingPage();

  const preferences = [
    {
      label: 'Preferred Language',
      value: 'English',
    },
    {
      label: 'Preferred Currency',
      value: 'CHF - Swiss Franc',
    },
    {
      label: 'Preferred Time Zone',
      value: '(GMT +01:00) Europe / Zurich',
    },
  ];

  const t = useTranslations();

  const backToNavbar = () => {
    setIsUpcoming(false)
  }

  return (
    <div className='preferences'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>{t(`preferences`)}</h2>
      </div>

      <div className='preferenceList'>
        {preferences.map((preference, index) => (
          <div key={index} className='preferenceItem'>
            <div className='info'>
              <p className='value'>{preference.value}</p>
              <p className='label'>{preference.label}</p>
            </div>
            <div className='actions'>
              <button className='editButton'>
                <span className='edit-icon'>
                  <Image src={"/images/icons/pencil-icon.svg"} alt="" width={18} height={18} />
                </span>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
