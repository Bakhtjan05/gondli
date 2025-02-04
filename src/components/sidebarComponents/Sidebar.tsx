'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import './Sidebar.scss';
import { useSidebar } from './SidebarContext';

export default function Sidebar() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  const { isSidebarVisible, toggleSidebar } = useSidebar();




  const navigation = [
    {
      href: `/${locale}/dashboard`,
      label: t('Dashboard'),
      icon: '/images/services/dashboard.svg',
      iconWhite: '/images/services/dashboard-white.svg'
    },
    {
      href: `/${locale}/BookingManage`,
      label: t('Bookings'),
      icon: '/images/services/bookings.svg',
      iconWhite: '/images/services/bookings-white.svg',
    },
    {
      href: `/${locale}/services`,
      label: t('services'),
      icon: '/images/services/services-icon.svg',
      iconWhite: '/images/services/services-icon-white.svg',
    },
    {
      href: `/${locale}/Customers`,
      label: t('Customers'),
      icon: '/images/services/customers.svg',
      iconWhite: '/images/services/customers-white.svg',
    },
    { href: `/${locale}/Messages`, label: t('Messages'), icon: '/images/services/messages.svg',  iconWhite: '/images/services/messages-white.svg'},
    {
      href: `/${locale}/analytics`,
      label: t('Analytics'),
      icon: '/images/services/analytics.svg',
      iconWhite: '/images/services/analytics-white.svg',
    },
    { href: `/${locale}/Finances`, label: t('Finances'), icon: '/images/services/finances.svg', iconWhite: '/images/services/finances-white.svg' },
    {
      href: `/${locale}/marketing`,
      label: t('Marketing'),
      icon: '/images/services/marketing.svg',
      iconWhite: '/images/services/marketing-white.svg',
    },
  ];

  const salesChannels = [
    {
      href: `/${locale}/editVenueDetails`,
      label: 'Vitra',
      icon: '/images/services/Vitra.svg',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar(); // Закрыть Sidebar при клике вне его
      }
    };

    if (isSidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarVisible, toggleSidebar]);

  return (
    <aside className={`sidebar !border-l-0 max-lg:!inset-y-0 max-lg:!transform max-lg:!max-w-64 max-lg:!w-full max-lg:!transition-transform max-lg:!duration-300 ${isSidebarVisible ? 'max-lg:!translate-x-0' : 'max-lg:!-translate-x-full'}`} ref={sidebarRef}>
      <div className='sidebar__container'>
        {/* Header - Fixed */}
        <div className='sidebar__header'>
          <div className='logo'>
            <Image
              src='/images/logo/index.svg'
              alt='Gondli Logo'
              width={100}
              height={16}
            />
          </div>
          <hr />
        </div>

        {/* Scrollable Content - Including Navigation, Sales Channels, and Footer */}
        <div className='sidebar__scrollable'>
          {/* Navigation */}
          <nav className='sidebar__nav'>
            <ul>
              {navigation.map(({ href, label, icon, iconWhite }) => (
                <li key={label} onClick={() => toggleSidebar()}>
                  <Link href={href}>
                    <div
                      className={`sidebar__nav-item ${
                        pathname === href ? 'sidebar__nav-item--active hover:!bg-[#3A626B]' : ''
                      }`}
                    >
                      <Image src={pathname === href ? iconWhite : icon} alt={label} width={20} height={20} />
                      {label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sales Channels */}
          <div className='sidebar__sales'>
            <h4>{t('Sales Channels')}</h4>
            <ul>
              {salesChannels.map(({ label, icon, href }) => (
                <a href={href} className='sidebar__channel-link' key={label}>
                  <li className='sidebar__channel'>
                    <div className='sidebar__channel-info'>
                      <Image
                        src={icon}
                        alt='Logo'
                        width={20}
                        height={10}
                      />
                      <span>{label}</span>
                    </div>
                    <span className='sidebar__channel-edit'>
                      <Image
                        src='/images/home/editI.svg'
                        alt='edit'
                        width={16}
                        height={16}
                      />
                    </span>
                  </li>
                </a>
              ))}
            </ul>
          </div>

          {/* Footer - Now part of scrollable content */}
          <div className='sidebar__footer'>
            <Link href='/settings'>
              <div
                className={`sidebar__footer-item ${
                  pathname === '/settings' ? 'sidebar__footer-item--active' : ''
                }`}
              >
                <Image
                  src='/images/services/settings.svg'
                  alt='settings'
                  height={16}
                  width={16}
                />
                {t('Settings')}
              </div>
            </Link>
            <Link href='/logout'>
              <div
                className={`sidebar__footer-item ${
                  pathname === '/logout' ? 'sidebar__footer-item--active' : ''
                }`}
              >
                <Image
                  src='/images/services/logout.svg'
                  alt='logout'
                  height={16}
                  width={16}
                />
                {t('logout')}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
