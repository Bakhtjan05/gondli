'use client';

import React from 'react';
import './Donators.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Donators: React.FC = () => {
  const t = useTranslations();
  // Define the reviews array
  const donators = [
    {
      name: 'John S.',
      badge: '/images/content/badge1.svg',
      userImage: '/images/content/user1.svg',
      review:
        "I absolutely loved the Pilates workshop! As a beginner, I was a bit nervous, but the instructor's clear explanations and supportive guidance made me feel at ease. The 21-minute video class was perfect for my busy schedule, and I felt energized and refreshed afterward. Highly recommend!",
      date: '01 Jan, 2024',
    },
    {
      name: 'Michael L.',
      badge: '/images/content/badge2.svg',
      userImage: '/images/content/user2.svg',
      review:
        "What a fantastic Pilates experience! The instructor's expertise and attention to detail really stood out to me. The video class was well-paced, and I appreciated the variety of exercises included. After just one session, I could feel the difference in my flexibility and strength. Can't wait to join the next workshop!",
      rating: 10,
      date: '01 Jan, 2024',
    },
    {
      name: 'Anthony M.',
      badge: '/images/content/badge3.svg',
      userImage: '/images/content/user3.svg',
      review:
        "I've tried other Pilates classes before, but none compare to this workshop! The instructor's passion for Pilates shines through, and it's contagious. The video class was challenging yet accessible, with modifications offered for different fitness levels. I felt a sense of accomplishment after completing the session and left feeling rejuvenated. Thank you!",
      date: '01 Jan, 2024',
    },
    {
      name: 'John Doe',
      badge: '/images/content/badge2.svg',
      userImage: '/images/content/user4.svg',
      review:
        "As someone with a hectic schedule, finding time for exercise can be tough. That's why I'm grateful for this Pilates workshop! The 21-minute online video class was the perfect length for a quick workout session, and I appreciated the convenience of being able to access it from anywhere. The instructor's clear instructions made it easy to follow along, and I left feeling stronger and more centered.",
      date: '01 Jan, 2024',
    },
    {
      name: 'David R.',
      badge: '/images/content/badge2.svg',
      userImage: '/images/content/user5.svg',
      review:
        "As someone with a hectic schedule, finding time for exercise can be tough. That's why I'm grateful for this Pilates workshop! The 21-minute online video class was the perfect length for a quick workout session, and I appreciated the convenience of being able to access it from anywhere. The instructor's clear instructions made it easy to follow along, and I left feeling stronger and more centered.",
      date: '01 Jan, 2024',
    },
  ];

  return (
    <div className='donators'>
      <h3>{t('donators')}</h3>
      {donators.map((review, index) => (
        <div className='block' key={index}>
          <div className='user'>
            <Image
              priority
              width={40}
              height={40}
              src={review.userImage}
              alt='user'
            />
          </div>
          <div className='review-info'>
            <h4>
              {review.name}{' '}
              <Image
                priority
                width={26}
                height={26}
                src={review.badge}
                alt='user'
              />
            </h4>
            <p>{review.review}</p>
            <div className='info'>
              <span className='minute'>{review.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Donators;
