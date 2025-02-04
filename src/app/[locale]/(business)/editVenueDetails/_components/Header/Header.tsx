'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import './Header.scss';

interface HeaderProps {
  setActiveComponent: (component: string) => void;
}

export default function Header({ setActiveComponent }: HeaderProps) {
  const [activeTab, setActiveTab] = useState<string>('general');
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const navigationItems = [
    'general',
    'working-hours',
    'services',
    'amenities',
    'promotions',
    'instant-booking',
    'availability',
    'cancellation-policy',
  ];

  const handleTabClick = (item: string) => {
    if (item === 'services') {
      router.push(`/${locale}/services`);
    } else {
      setActiveTab(item);
      const componentName = item
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setActiveComponent(componentName);
    }
  };

  return (
    <header className='header'>
      <div className='header__main'>
        <div className='header__info'>
          <h1 className='header__title max-lg:!text-lg'> {t('edit-venue-title')}</h1>
          <p className='header__host'>
            <span className='header_image'>
              <Image
                src={'/images/logo/Logo.svg'}
                alt='Logo'
                width={24}
                height={24}
              />
            </span>
            <span className='header__hosted-by max-lg:!text-sm'>{t('hosted-by')} Vitro</span>
            <span className='header__verified-badge'>
              <Image
                src={'/images/logo/right.svg'}
                alt='Logo'
                width={20}
                height={20}
              />
            </span>
          </p>
        </div>

        <div className='header__buttons max-lg:!fixed max-lg:!bottom-0 max-lg:!left-0 max-lg:!w-full max-lg:!z-30 max-lg:!p-4 max-lg:!bg-white max-lg:!border-t max-lg:!border-[#DBECF0] max-lg:!justify-end'>
          <Button
            variant='outline'
            className='button-preview flex items-center'
          >
            <span className='flex items-center'>
              {t('Preview')}
              <Image
                src='/images/logo/ArrowDown.svg'
                alt='Arrow Down'
                width={14}
                height={14}
                className='ml-[6px]'
              />
            </span>
          </Button>

          <Button variant='default' className='button-save'>
            {t('Save')}
          </Button>
        </div>
      </div>

      <nav className='header__navigation'>
        <ul className='overflow-x-auto overflow-y-visible '>
          {navigationItems.map((item, index) => (
            <li
              key={item}
              className={`header__nav-item text-nowrap ${activeTab === item ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
              data-separator={item === 'promotions' ? 'true' : 'false'}
            >
              {t(item)}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
