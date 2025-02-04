'use client';
import React, { useState, useEffect, useRef } from 'react';
import './SocialIcons.scss';
import Link from 'next/link';
import LanguageModal from '../LanguageModal/LanguageModal'; // Import the modal component
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation'; // Correct import
import Image from 'next/image';
import SignupModal from '../SignupModal/SignupModal';
import LoginModal from '../LoginModal/LoginModal';
import { useTranslations } from 'next-intl';
import MembershipModal from '../MembershipModal/MembershipModal';
import { useAuth } from '@/types/auth';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, selectUpcomingPageState, setUserName } from '@/slices/upcomingPageSlice';
const SocialIcons: React.FC = () => {
  const locale = useLocale();
  const { token, logout } = useAuth();
  const { userName, isAuthenticated } = useSelector(selectUpcomingPageState);
  const pathname = usePathname(); // Get the current pathname
  const t = useTranslations();
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    'English (United States)',
  );
  const [activePlan, setActivePlan] = useState<'basic' | 'pro'>('basic');
  const [activePlanInterval, setActivePlanInterval] =
    useState<string>('monthly');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle dropdown
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openMembershipModal = () => setIsMembershipModalOpen(true);
  const closeMembershipModal = () => setIsMembershipModalOpen(false);

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(e.target.value);
    setOpenDropdown(null); // Close the dropdown after selection
  };

  // Handle active plan change
  const handleActivePlanChange = (e: 'basic' | 'pro') => {
    setActivePlan(e);
  };
  // Handle active plan interval change
  const handleActivePlanIntervalChange = (e: string) => {
    setActivePlanInterval(e);
  };



  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return; // Если пользователь не авторизован, не делаем запрос

      try {
        const response = await axios.get('/api/profile/user/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUserName(response.data.data.name));
      } catch (err) {
        setError(err.response?.data || err.message);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, dispatch]); // Запрос на данные только при авторизации


  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);





  // Function to close dropdown after clicking a link
  const handleLinkClick = () => {
    setOpenDropdown(null); // Close the dropdown
  };

  return (
    <React.Fragment>
      <div className='social-icons-container' ref={dropdownRef}>
        <div className='dropdown'>
          <button
            className={`dropdown-toggle ${openDropdown === 1 ? 'active-dropdown' : ''}`}
            onClick={() => toggleDropdown(1)}
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11 19.7999C13.3339 19.7999 15.5722 18.8728 17.2226 17.2225C18.8729 15.5722 19.8 13.3339 19.8 11C19.8 8.66605 18.8729 6.42773 17.2226 4.77741C15.5722 3.12709 13.3339 2.19995 11 2.19995C8.66611 2.19995 6.42779 3.12709 4.77747 4.77741C3.12715 6.42773 2.20001 8.66605 2.20001 11C2.20001 13.3339 3.12715 15.5722 4.77747 17.2225C6.42779 18.8728 8.66611 19.7999 11 19.7999ZM10.5105 7.88475C10.3449 7.77422 10.1523 7.71074 9.95338 7.70108C9.75447 7.69142 9.55666 7.73594 9.38107 7.82989C9.20548 7.92384 9.05868 8.0637 8.95635 8.23454C8.85402 8.40538 8.79998 8.6008 8.80001 8.79995V13.2C8.79998 13.3991 8.85402 13.5945 8.95635 13.7654C9.05868 13.9362 9.20548 14.0761 9.38107 14.17C9.55666 14.264 9.75447 14.3085 9.95338 14.2988C10.1523 14.2892 10.3449 14.2257 10.5105 14.1151L13.8105 11.9152C13.9612 11.8147 14.0847 11.6786 14.1701 11.519C14.2556 11.3593 14.3003 11.181 14.3003 11C14.3003 10.8189 14.2556 10.6406 14.1701 10.481C14.0847 10.3213 13.9612 10.1852 13.8105 10.0848L10.5105 7.88475Z'
                fill='url(#paint0_linear_2_1028)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_2_1028'
                  x1='11'
                  y1='2.19995'
                  x2='11'
                  y2='19.7999'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#5CB170' />
                  <stop offset='1' stopColor='#D6DE6D' />
                </linearGradient>
              </defs>
            </svg>
          </button>

          {openDropdown === 1 && (
            <ul className='dropdown-menu'>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/digitalContent`}
                >
                  {t('digital-content')}
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/charityEvent`}
                >
                  {t('charity-events')}
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/wellnessService`}
                >
                  {t('wellness-service')}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className='dropdown'>
          <button
            className={`dropdown-toggle ${openDropdown === 2 || pathname.includes('/notifications') ? 'active-dropdown' : ''}`}
            onClick={() => toggleDropdown(2)}
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.1609 2.30306C11.7803 2.23506 11.392 2.2002 11.0001 2.2002C9.24963 2.2002 7.57089 2.89555 6.33315 4.13329C5.09541 5.37103 4.40006 7.04977 4.40006 8.80019V12.7448L3.62236 13.5225C3.46857 13.6763 3.36384 13.8723 3.32142 14.0857C3.27899 14.299 3.30078 14.5201 3.38401 14.7211C3.46725 14.9221 3.6082 15.0939 3.78905 15.2147C3.96991 15.3356 4.18253 15.4001 4.40006 15.4002H17.6001C17.8176 15.4001 18.0302 15.3356 18.2111 15.2147C18.3919 15.0939 18.5329 14.9221 18.6161 14.7211C18.6993 14.5201 18.7211 14.299 18.6787 14.0857C18.6363 13.8723 18.5315 13.6763 18.3778 13.5225L17.6001 12.7448V8.80019C17.6001 8.49062 17.5783 8.18329 17.5357 7.88025C17.2031 7.95856 16.8564 8 16.5 8C14.0147 8 12 5.98528 12 3.5C12 3.08555 12.056 2.68418 12.1609 2.30306ZM8.66661 18.8336C9.28548 19.4525 10.1248 19.8002 11.0001 19.8002C11.8753 19.8002 12.7146 19.4525 13.3335 18.8336C13.9524 18.2148 14.3001 17.3754 14.3001 16.5002H7.70006C7.70006 17.3754 8.04774 18.2148 8.66661 18.8336Z'
                fill='url(#paint0_linear_2_988)'
              />
              <path
                d='M19 3.5C19 4.88071 17.8807 6 16.5 6C15.1193 6 14 4.88071 14 3.5C14 2.11929 15.1193 1 16.5 1C17.8807 1 19 2.11929 19 3.5Z'
                fill='url(#paint1_linear_2_988)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_2_988'
                  x1='20.4221'
                  y1='11.0002'
                  x2='-0.0521378'
                  y2='12.0445'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#5CB170' />
                  <stop offset='1' stopColor='#D6DE6D' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_2_988'
                  x1='19.5592'
                  y1='3.5'
                  x2='12.9168'
                  y2='3.88721'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#5CB170' />
                  <stop offset='1' stopColor='#D6DE6D' />
                </linearGradient>
              </defs>
            </svg>
          </button>

          {openDropdown === 2 && (
            <ul className='dropdown-menu notification'>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/notifications`}
                >
                  <div className='notificationWrap active'>
                    <div className='logoWrap'>
                      <div className='logo'>
                        <Image
                          priority
                          width={40}
                          height={40}
                          src='/images/home/spa.svg'
                          alt='spa'
                        />
                      </div>
                      <Image
                        priority
                        width={20}
                        height={20}
                        className='mark'
                        src='/images/home/check.svg'
                        alt='check'
                      />
                    </div>
                    <div className='content'>
                      <p>
                        Congratulations! Your booking got accepted by{' '}
                        <b>Harmony Haven Spa center.</b>
                      </p>
                      <p className='time'>5m Ago</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/notifications`}
                >
                  <div className='notificationWrap active'>
                    <div className='logoWrap'>
                      <div className='logo noBorder'>
                        <Image
                          priority
                          width={40}
                          height={40}
                          src='/images/home/airbnb.svg'
                          alt='airbnb'
                        />
                      </div>
                      <Image
                        priority
                        width={20}
                        height={20}
                        className='mark'
                        src='/images/home/comment.svg'
                        alt='comment'
                      />
                    </div>
                    <div className='content'>
                      <p>
                        <b>Pure Pilates Oasis</b> replied back on your comment:
                        ”When is the next free time for booking?”
                      </p>
                      <p className='time'>2h Ago</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/notifications`}
                >
                  <div className='notificationWrap'>
                    <div className='logo'>
                      <Image
                        priority
                        width={40}
                        height={40}
                        src='/images/home/digital.svg'
                        alt='digital'
                      />
                    </div>
                    <div className='content'>
                      <p>
                        Check out the new Digital Content on Gondli available
                        for pro members only.
                      </p>
                      <p className='time'>5h Ago</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/notifications`}
                >
                  <div className='seeAll'>
                    <p>{t('see-all-notifications')}</p>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className='dropdown'>
          <button className='user' onClick={() => toggleDropdown(3)}>
            <Image
              priority
              width={50}
              height={50}
              className='logo'
              src='/images/home/user.svg'
              alt='user'
            />
            {isAuthenticated && (
              <p>{userName}</p>
            )}
            <Image
              priority
              width={10}
              height={7}
              className='arrow'
              src='/images/home/arrow.svg'
              alt='arrow'
            />
          </button>

          {openDropdown === 3 && (
            <ul className='dropdown-menu userInfo'>
              <li className='dropdown-item'>
                <Link
                  onClick={handleLinkClick}
                  href={`/${locale}/user-profile/upcoming-bookings`}
                >
                  <Image
                    priority
                    width={32}
                    height={32}
                    src='/images/home/Notifications.svg'
                    alt='Notifications'
                  />
                  <p>{t('profile')}</p>
                </Link>
              </li>
              <li className='dropdown-item'>
                <Link onClick={handleLinkClick} href='/'>
                  <Image
                    priority
                    width={32}
                    height={32}
                    src='/images/home/Notifications-1.svg'
                    alt='Notifications'
                  />
                  <p>{t('settings')}</p>
                </Link>
              </li>
              <li className='dropdown-item' onClick={openMembershipModal}>
                <div className='membership'>
                  <Image
                    priority
                    width={32}
                    height={32}
                    src='/images/home/Notifications-2.svg'
                    alt='Notifications'
                  />
                  <p>{t('membership')}</p>
                </div>
              </li>
              <li className='dropdown-item' onClick={openModal}>
                <div className='language' onClick={handleLinkClick}>
                  <Image
                    priority
                    width={32}
                    height={32}
                    src='/images/home/Notifications-3.svg'
                    alt='Notifications'
                  />
                  <p>{t('language')}</p>
                </div>
              </li>
              <li
                className='dropdown-item borderTop'
                onClick={() => {
                  logout();
                }}
              >
                <div className='logout !flex items-center gap-[10px]'>
                  <Image
                    priority
                    width={32}
                    height={32}
                    src='/images/home/Notifications-4.svg'
                    alt='Notifications'
                  />
                  <p className='text-white'>{t('log-out')}</p>
                </div>

              </li>
            </ul>
          )}
        </div>
      </div>
      <LanguageModal
        show={isModalOpen}
        onClose={closeModal}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />

      <MembershipModal
        activePlan={activePlan}
        show={isMembershipModalOpen}
        onClose={closeMembershipModal}
        currency='CHF'
        price={29.99}
        activePlanInterval={activePlanInterval}
        changePaymentInterval={handleActivePlanIntervalChange}
        changeActivePlan={handleActivePlanChange}
      />
    </React.Fragment>
  );
};

export default SocialIcons;
