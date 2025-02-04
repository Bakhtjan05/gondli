"use client"


import React, { useEffect, useState } from 'react';
import './GivenReview.scss';
import Image from 'next/image';
import { useAuth } from '@/types/auth';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, selectUpcomingPageState } from '@/slices/upcomingPageSlice';


export default function Reviews() {

  const dispatch = useDispatch();

  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  const reviews = [
    {
      title: 'Serenity Spa Retreat',
      services: ['Spa', 'Aromatherapy', 'Relaxation'],
      date: '01 Jan, 2024',
      rating: 10,
      category: 'Energizing Cardio Fitness Class',
      description: `“Serenity Spa Retreat is a hidden gem in Zurich! The yoga classes are rejuvenating, and the spa experience is top-notch. The ambiance is so calming, and the staff is incredibly friendly. A perfect escape from the hustle and bustle of the city!”`,
      imageUrl: '/images/content/image-content.jpg',
    },
    {
      title: 'Mindful Movement Studio',
      services: ['Yoga', 'Mindfulness', 'Stress Management'],
      date: '23 Dec, 2023',
      rating: 10,
      category: 'Strength and Conditioning Bootcamp',
      description: `“I've been attending the fitness classes here for a month, and I'm hooked! The trainers are motivating, and the variety of classes keeps it interesting. The Wellness Bar is a great touch – love the post-workout smoothies. Highly recommend!”`,
      imageUrl: '/images/content/image-content.jpg',
    },
    {
      title: 'Tranquility Spa Center',
      services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
      date: '22 Dec, 2023',
      rating: 9,
      category: 'Energizing Cardio Fitness Class',
      description: `“Had a relaxing massage at Harmony Haven. The spa ambiance was lovely, but I wish the massage room had softer lighting. Overall, a good experience, and the staff was accommodating. I'll be back for another session.”`,
      imageUrl: '/images/content/image-content.jpg',
    },
    {
      title: 'Harmony Haven Wellness Center',
      services: ['Spa', 'Yoga', 'Fitness', 'Detox'],
      date: '21 Dec, 2023',
      rating: 9,
      category: 'Energizing Cardio Fitness Class',
      description: `“Had a relaxing massage at Harmony Haven. The spa ambiance was lovely, but I wish the massage room had softer lighting. Overall, a good experience, and the staff was accommodating. I'll be back for another session.”`,
      imageUrl: '/images/content/image-content.jpg',
    },
  ];

  const backToNavbar = () => {
    dispatch(setIsUpcomingPage(false))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile/reviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data?.data || []); // Сохраняем данные в состоянии
      } catch (err) {
        setError(err.response?.data || err.message); // Обрабатываем ошибку
      }
    };

    fetchData();
  }, []); // [] означает, что запрос будет выполнен только один раз при монтировании компонента

  console.log(data);


  console.log(data)

  return (
    <div className='container-block'>
      <div className='title flex items-center gap-[10px]' onClick={backToNavbar}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className='max-lg:!mb-0 max-lg:!text-xl'>Given Reviews</h2>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className='reviewCard max-lg:flex-col'>
          {/* Left Side: Content */}
          {/* Header */}
          <div className='content max-lg:order-2'>
            <div className='header'>
              <div>
                <h3 className='review-title max-lg:!text-sm'>{review.title}</h3>
                <p className='services'>{review.services.join(' · ')}</p>
              </div>
              <div></div>
            </div>
            {/* Details */}
            <div className='details'>
              <div className='divider'></div>
              <div className='info'>
                <p className='max-lg:!text-sm'>{review.description}</p>
                <div className='review-card-footer items-center'>
                  {/* rating */}
                  <div className='rating-section '>
                    <div>
                      <Image
                        priority
                        width={12}
                        height={12}
                        src='/images/home/star.svg'
                        alt='star'
                      />
                    </div>
                    <div className='text-sm text-[#F4B003]'>{review.rating}</div>
                    <div className='text-sm'>/</div>
                    <div className='text-sm'>10</div>
                  </div>
                  <div className='dot'></div>
                  {/* category */}
                  <div className='text-sm'>{review.category}</div>
                  <div className='dot'></div>
                  {/* date */}
                  <div className='text-sm'>{review.date}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className='imageWrapper max-lg:h-[228px] max-lg:!w-full relative'>
            <Image
              src={review.imageUrl}
              alt={review.title}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
