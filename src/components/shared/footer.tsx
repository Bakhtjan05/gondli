'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from '@/icons';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Booking from '@/app/[locale]/(user)/wellness-service/_components/Booking/Booking';



export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();

  const staticPaths = [/business-registration/];
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const noNavigationMenu = staticPaths.some((path) =>
    typeof path === 'string' ? path === pathname : path.test(pathname),
  );

  const isWellnessService = pathname === `/${locale}/wellnessService`;


  const handleOpenBooking = () => {
    setIsBookingOpen((prev) => !prev)
  }
  if (noNavigationMenu) {
    return null;
  }

  const navigation = [
    {
      title: t('discover'),
      links: [
        {
          label: t('about-us'),
          href: '/about-us',
        },
        {
          label: t('services'),
          href: '#',
        },
        {
          label: t('subscriptions'),
          href: '#',
        },
        {
          label: t('our-blog'),
          href: '/blog/1',
        },
      ],
    },
    {
      title: t('help'),
      links: [
        {
          label: t('faq'),
          href: '#',
        },
        {
          label: t('customer-service'),
          href: '#',
        },
        {
          label: t('terms-and-conditions'),
          href: '#',
        },
        {
          label: t('privacy-policy'),
          href: '#',
        },
      ],
    },
    {
      title: t('find-us-on'),
      links: [
        {
          label: 'Facebook',
          href: '#',
        },
        {
          label: 'Instagram',
          href: '#',
        },
        {
          label: 'Twitter',
          href: '#',
        },
        {
          label: 'Linkedin',
          href: '#',
        },
      ],
    },
    {
      title: t('business'),
      links: [
        {
          label: t('register-your-business'),
          href: '#',
        },
        {
          label: t('advertise-on-gondli'),
          href: '#',
        },
      ],
    },
  ];
  return (
    <footer className='flex w-full flex-col bg-surface-brand text-sm text-white sm:text-base'>
      <div className='flex w-full flex-col px-3.75 pt-8 lg:px-25'>
        <Image
          src={'/images/logo/index.svg'}
          alt='logo'
          priority
          width={82}
          height={18}
          className='sm:hidden'
        />
        <nav className='grid grid-cols-2 gap-y-11 pt-10 sm:grid-cols-4 sm:gap-x-5 sm:pt-0'>
          {navigation.map(({ title, links }) => (
            <ul key={title} className='space-y-3'>
              <h3 className='text-situational-secondary'>{title}</h3>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={`/${locale}${href}`}>{label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <div className='mt-10 h-px w-full bg-situational-primary sm:mt-8' />
        <div className='flex w-full items-center justify-between !pt-5 pb-8 sm:pt-8'>
          <div className='flex items-center gap-1.5'>
            <Globe />
            <p>{t('switzerland')}</p>
          </div>
          <Image
            src={'/images/logo/index.svg'}
            alt='logo'
            priority
            width={102}
            height={24}
            className='hidden sm:block'
          />
          <p>© 2023. {t('all-rights-reserved')}</p>
        </div>
      </div>
      {isWellnessService && (
        <div className='w-full h-[91px] bg-[#0C343D]'>

        </div>
      )}
      {isWellnessService && (
        <div className='fixed bottom-0 left-0 w-full bg-[#0C343D] !py-3 border-t border-[#124C59] lg:hidden'>
          <div className='px-3.75 flex justify-between'>
            <div>
              <p>25 - 110 CHF</p>
              <p className='text-sm text-[#A9E2EF] mt-1'>Select Booking Details</p>
            </div>
            <button

              className='bg-[linear-gradient(266.66deg,_#5CB170_-7.81%,_#D6DE6D_118.14%)] !rounded-3xl !py-[14px] !px-5'
              onClick={handleOpenBooking}
            >Book
            </button >
          </div>
        </div>
      )}

      {isWellnessService && isBookingOpen && (
        <div className='fixed bottom-0 w-full bg-[#F5F9FF] rounded-t-2xl z-40'>
          <Booking isBookingOpen={isBookingOpen} setIsBookingOpen={setIsBookingOpen} />

        </div>
      )}

      {isWellnessService && isBookingOpen && (
        <div className='fixed left-0 top-0 w-full h-full bg-[#000B19CC] z-30'>

        </div>
      )}


    </footer>
  );
}
