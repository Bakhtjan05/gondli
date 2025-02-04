'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RightArrow, Services, Settings } from '@/icons/index';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface SidebarProps {
  isUpcomingPage: boolean;
  setIsUpcoming: React.Dispatch<React.SetStateAction<boolean>>;
}



const Sidebar: React.FC<SidebarProps> = ({ isUpcomingPage, setIsUpcoming }) => {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const servicesLinks = [
    {
      href: `/${locale}/user-profile/upcoming-bookings`,
      label: t('upcomingBookings'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/booking-history`,
      label: t('bookingHistory'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/given-reviews`,
      label: t('givenReviews'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/favorites`,
      label: t('favorites'),
      onClick: () => setIsUpcoming(true),
    },

  ];

  const settingsLinks = [
    {
      href: `/${locale}/user-profile/profile-and-security`,
      label: t('profileAndSecurity'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/payment-methods`,
      label: t('paymentMethods'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/notifications`,
      label: t('notifications'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/privacy-and-sharing`,
      label: t('privacyAndSharing'),
      onClick: () => setIsUpcoming(true),
    },
    {
      href: `/${locale}/user-profile/preferences`,
      label: t('preferences'),
      onClick: () => setIsUpcoming(true),
    },
  ];

  return (
    <div className='mb-12 mr-6 w-[350px] rounded-lg border-[1px] border-border-primary bg-[#F5F9FF] p-6  max-lg:w-full max-lg:mb-7'>
      {/* Services Section */}
      <div className='mb-8'>
        <h2 className='mb-3 flex items-center text-lg font-semibold text-gray-700'>
          <Services className='mr-3' /> {t('services')}
        </h2>
        <div className='ml-1 flex'>
          <div className='rounded-lg border-l-[2px] border-[#DBECF0]'></div>
          <div className='ml-[14px] space-y-2 w-full'>
            {servicesLinks.map(({ href, label, onClick }) => {
              const isActive = pathname === href;
              return (
                <div key={href}
                  className='relative w-full'
                  onClick={() => {
                    if (window.innerWidth < 1024 && onClick) {
                      onClick();
                    }
                  }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between rounded p-2 hover:bg-gray-100 ${isActive
                      ? 'text-lg font-semibold text-[#000B19]'
                      : 'text-lg text-gray-500 max-lg:!text-[#000B19] max-lg:font-semibold'
                      }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className='absolute bottom-0 left-[-16px] top-0 w-[2px] rounded-lg bg-[#124C59] max-lg:hidden'></span>
                    )}
                    {isActive && (
                      <span className=' h-[20px] w-[20px] text-situational-primary max-lg:hidden'>
                        <RightArrow />
                      </span>
                    )}
                    <span className=' h-[20px] w-[20px] text-situational-primary lg:hidden'>
                      <RightArrow />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h2 className='mb-3 flex items-center text-lg font-semibold text-gray-700'>
          <Settings className='mr-3' /> {t('settings')}
        </h2>
        <div className='ml-1 flex'>
          <div className='rounded-lg border-l-[2px] border-[#DBECF0]'></div>
          <div className='ml-[14px] space-y-2 w-full'>
            {settingsLinks.map(({ href, label, onClick }) => {
              const isActive = pathname === href;
              return (
                <div
                  key={href}
                  className='relative w-full'
                  onClick={() => {
                    if (window.innerWidth < 1024 && onClick) {
                      onClick();
                    }
                  }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between rounded p-2 hover:bg-gray-100 ${isActive
                      ? 'text-lg font-semibold text-[#000B19]'
                      : 'text-lg text-gray-500 max-lg:!text-[#000B19] max-lg:font-semibold'
                      }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className='absolute bottom-0 left-[-16px] top-0 w-[2px] rounded-lg bg-[#124C59] max-lg:hidden'></span>
                    )}
                    {isActive && (
                      <span className='= h-[20px] w-[20px] text-situational-primary max-lg:hidden'>
                        <RightArrow />
                      </span>
                    )}

                    <span className=' h-[20px] w-[20px] text-situational-primary lg:hidden'>
                      <RightArrow />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
