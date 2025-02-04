"use client"


import Image from 'next/image';
import './BookingHistory.scss';
import {
  BookingService,
  Calender,
  Check,
  Location,
  TimerWhite,
  UserLogo,
  X,
} from '@/icons';
import { useUpcomingPage } from '../../UpcomingPageContext';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/types/auth';

export default function BookingHistory() {
  interface BookingData {
    title: string;
    imageSrc: string;
    date: string;
    address: string;
    service: string;
    instructor: string;
    status: string;
    services: string[];
  }

  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { isUpcomingPage, setIsUpcoming } = useUpcomingPage();


  const bookingData: BookingData[] = [
    {
      title: 'Harmony Haven Wellness Center',
      imageSrc: '/images/content/image-content.jpg',
      date: '21 March, 2024',
      address:
        'Harmony Haven Wellness Center, 65 Tranquil Terrace, CH-8003 Zurich Switzerland',
      service: 'Power Vinyasa Yoga Workshop (60 Min)',
      instructor: 'Mandy Adams',
      status: 'Attended',
      services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
    },
    {
      title: 'Tranquil Tranquility Spa',
      imageSrc: '/images/content/image-content.jpg',
      date: '16 March, 2024',
      address:
        'Tranquil Tranquility Spa, 61 Gerrard Avenue, CH-6083 Zurich, Switzerland',
      service: 'Revitalizing Aromatherapy Facial (75 Min)',
      instructor: 'Tonya Bernhard',
      status: 'Canceled',
      services: ['Spa', 'Aromatherapy', 'Relaxation'],
    },
    {
      title: 'Mindful Movement Studio',
      imageSrc: '/images/content/image-content.jpg',
      date: '14 March, 2024',
      address:
        'Mindful Movement Studio, 15 Calm Lane, CH-7000 Zurich, Switzerland',
      service: 'Gentle Yoga Session (60 Min)',
      instructor: 'Anna Smith',
      status: 'Attended',
      services: ['Yoga', 'Mindfulness'],
    },
    {
      title: 'Vitality Wellness Lounge',
      imageSrc: '/images/content/image-content.jpg',
      date: '02 March, 2024',
      address:
        'Vitality Wellness Lounge, 20 Healthy Way, CH-8003 Zurich, Switzerland',
      service: 'Nutrition Consultation (45 Min)',
      instructor: 'James Brown',
      status: 'Attended',
      services: ['Nutrition', 'Health'],
    },
    {
      title: 'Blissful Balance Holistic Center',
      imageSrc: '/images/content/image-content.jpg',
      date: '26 February, 2024',
      address:
        'Blissful Balance Holistic Center, 10 Peaceful St, CH-8003 Zurich, Switzerland',
      service: 'Energy Healing Session (60 Min)',
      instructor: 'Sophie Lee',
      status: 'Canceled',
      services: ['Energy Healing', 'Workshops'],
    },
  ];

  const backToNavbar = () => {
    setIsUpcoming(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile/history', {
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
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>Booking History</h2>
      </div>
      {bookingData.map((booking, index) => (
        <div key={index} className='bookingCard max-lg:flex-col'>
          {/* Left Side: Content */}
          {/* Header */}
          <div className='content max-lg:order-2'>
            <div className='header'>
              <div>
                <h3 className='booking-title max-lg:!text-sm'>{booking.title}</h3>
                <p className='services'>{booking.services.join(' · ')}</p>
              </div>
              <div>
                <div className='status-section max-lg:hidden'>
                  <div>
                    {booking.status == 'Attended' ? (
                      <div className='attended'>
                        <span>
                          <Check />
                        </span>
                        <span>Attended</span>
                      </div>
                    ) : (
                      <div className='canceled'>
                        <span>
                          <X />
                        </span>
                        <span>Canceled</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Details */}
            <div className='details'>
              <div className='divider'></div>
              <div className='info max-lg:w-full'>
                <p className='date max-lg:!text-sm'>
                  <span>
                    <Calender />
                  </span>
                  <span>{booking.date}</span>
                </p>
                <p className='address max-lg:!text-sm'>
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
            <div className='status-section absolute right-2 top-3 lg:hidden'>
              <div>
                {booking.status == 'Attended' ? (
                  <div className='attended'>
                    <span>
                      <Check />
                    </span>
                    <span className='max-lg:text-sm'>Attended</span>
                  </div>
                ) : (
                  <div className='canceled'>
                    <span>
                      <X />
                    </span>
                    <span className='max-lg:text-sm'>Canceled</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
