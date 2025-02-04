"use client"

import Image from 'next/image';
import './UpcomingBookings.scss';
import {
  BookingService,
  Calender,
  Location,
  TimerWhite,
  UserLogo,
} from '@/icons';
import { useTranslations } from 'next-intl';
import { useUpcomingPage } from '../../UpcomingPageContext';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/types/auth';




const Bookings: React.FC = () => {
  interface BookingData {
    title: string;
    imageSrc: string;
    date: string;
    address: string;
    service: string;
    instructor: string;
    services: string[];
  }


  const bookingData: BookingData[] = [
    {
      title: 'Harmony Haven Wellness Center',
      imageSrc: '/images/content/image-content.jpg',
      date: '24 March, 2024',
      address:
        'Harmony Haven Wellness Center, 65 Tranquil Terrace, CH-8003 Zurich Switzerland',
      service: 'Power Vinyasa Yoga Workshop (60 Min)',
      instructor: 'Mandy Adams',
      services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
    },
    {
      title: 'Tranquil Tranquility Spa',
      imageSrc: '/images/content/image-content.jpg',
      date: '29 March, 2024',
      address:
        'Tranquil Tranquility Spa, 61 Gerrard Avenue, CH-6083 Zurich, Switzerland',
      service: 'Revitalizing Aromatherapy Facial (75 Min)',
      instructor: 'Tonya Bernhard',
      services: ['Spa', 'Aromatherapy', 'Relaxation'],
    },
  ];

  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { isUpcomingPage, setIsUpcoming } = useUpcomingPage();

  const t = useTranslations();

  const backToNavbar = () => {
    setIsUpcoming(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile/bookings', {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        setData(response.data?.data?.upcoming || []); // Сохраняем данные в состоянии
      } catch (err) {
        setError(err.response?.data || err.message); // Обрабатываем ошибку
      }
    };

    fetchData();
  }, []); // [] означает, что запрос будет выполнен только один раз при монтировании компонента


  return (
    <div className='container-block'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt=''/>
        </div>

        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>{t(`upcomingBookings`)}</h2>
      </div>
      {bookingData.map((booking, index) => (
        <div key={index} className='bookingCard max-lg:flex-col'>
          {/* Left Side: Content */}
          {/* header */}
          <div className='content max-lg:order-2 '>
            <div className='header'>
              <div>
                <h3 className='booking-title max-lg:!text-sm '>{booking.title}</h3>
                <p className='services'>{booking.services.join(' · ')}</p>
              </div>
              <div>
                <div className='pending-section max-lg:!hidden'>
                  <div>
                    <TimerWhite />
                  </div>
                  <div>
                    <p className='max-lg:!text-sm'>Pending</p>
                  </div>
                </div>
              </div>
            </div>
            {/* details */}
            <div className='details'>
              <div className='divider'></div>

              <div className='info max-lg:w-full'>
                <p className='date max-lg:!text-sm'>
                  <span>
                    <Calender />
                  </span>
                  <span>{booking.date}</span>
                </p>
                <p className='address max-lg:!text-sm max-lg:w-full'>
                  <span>
                    <Location />
                  </span>
                  <span className='max-lg:text-ellipsis max-lg:text-nowrap max-lg:overflow-hidden max-lg:pr-4'>{booking.address}</span>
                </p>
                <p className='service max-lg:!text-sm'>
                  <span>
                    <BookingService />
                  </span>
                  <span className=' max-lg:text-ellipsis max-lg:text-nowrap  max-lg:overflow-hidden max-lg:pr-4'>{booking.service}</span>
                </p>
                <p className='instructor max-lg:!text-sm'>
                  <span>
                    <UserLogo />
                  </span>
                  <span>{booking.instructor}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className='imageWrapper max-lg:h-[228px] max-lg:!w-full relative'>
            <Image
              src={booking.imageSrc}
              alt={booking.title}
              layout='fill'
              objectFit='cover'
            />
            <div className='pending-section lg:!hidden absolute right-2 top-3'>
              <div>
                <TimerWhite />
              </div>
              <div>
                <p className='max-lg:!text-sm'>Pending</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings
