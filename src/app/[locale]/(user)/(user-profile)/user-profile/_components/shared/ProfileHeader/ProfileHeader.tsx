// ProfileHeader.tsx
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './ProfileHeader.scss';
import BadgeModal from '../../Modals/BadgeModalWithSliders/BadgeModal';
import KarmaCoinsModal from '../../Modals/CoinsModalWithSliders/KarmaCoinsModal';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

const ProfileHeader: React.FC = () => {
  
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className='profile-header'>
      <div className='profile-header-container '>
        <div className='profile-info '>
          {/* User Image */}
          <div className='profile-image'>
            <Image
              src='/images/testimonials/andre-lawson.png'
              alt='User Profile Picture'
              width={100}
              height={100}
              className='object-cover'
            />
          </div>

          {/* User Info */}
          <div className='user-details'>
            <h2 className='user-name'>Madeline Hintz</h2>
            <div className='user-stats flex items-center'>
              <p className='pr-2 border-r border-[#DBECF0]'>321 <span className='text-[#878E97]'>Following</span></p>
              <p className='ps-2'>700 <span className='text-[#878E97]'>Follower</span></p>
            </div>
            
          </div>
        </div>
        {/* Edit Profile Button */}
        <div className='edit-btn-section  max-lg:flex max-lg:justify-end'>
          <button className='btn'>
            <Link href={`/${locale}/user-profile/profile-and-security`} className='!text-nowrap'>
              {t('editProfile')}
            </Link>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ProfileHeader;
