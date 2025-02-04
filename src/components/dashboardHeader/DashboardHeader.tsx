"use client"

import React from 'react';
import "./Header.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSidebar } from '../sidebarComponents/SidebarContext';

const DashboardHeader: React.FC = () => {
  const t = useTranslations();
  const profile = {
    profilePicture: "/images/bookingManage/bell-icon.svg",
    profileFirstName: "Joe",
    profileFullName: "Joe Nicolas"
  }

  const { toggleSidebar } = useSidebar(); 

  return (
    <div className='box-header max-lg:!bg-[#0C343D] max-lg:!text-white'>
      <p className='name max-lg:hidden'>{t('welcome-title')}, <span>{profile.profileFirstName}!</span></p>
      <div className='lg:hidden'>
        <Image src={"/images/icons/logo.png"} alt='' width={82} height={18} />
      </div>
      <div className='profile-notification'>
        <div className='notification'>
          <Image src={profile.profilePicture} alt='' width={22} height={22} />
        </div>
        <div className='profile'>
          <div className='profile-picture'>
            <Image src="/images/bookingManage/profile-picture.png" alt='' width={32} height={32}></Image>
          </div>
          <div className='profile-photo-name'>
            <p>{profile.profileFullName}</p>
            <Image src="/images/bookingManage/dropdown-icon.svg" alt='' width={10} height={8}></Image>
          </div>
        </div>
      </div>
      <div className='bar flex items-center'>
        <div className='flex items-center gap-3 pr-4'>
          <button>
              <Image src="/images/icons/bell-icon.svg" alt='' width={22} height={22} />
          </button>
          <button>
              <Image src="/images/icons/plus-icon.svg" alt='' width={24} height={24} />
          </button>
          <button>
              <Image src="/images/icons/boost-icon.svg" alt='' width={22} height={22} />
          </button>
        </div>
        <div className='h-4 w-[1px] bg-[#124C59]'>

        </div>
        <div className='ps-3' onClick={toggleSidebar}>
          <Image src="/images/icons/bar-chart.svg" alt='' width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;