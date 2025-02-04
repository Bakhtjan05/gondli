import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';
import { Quotes } from '@/icons';

export default function ConnectionsSection() {
  const t = useTranslations();

  const reviews = [
    [
      {
        author: {
          image: '/images/connections/tiffany-ricks.png',
          name: 'Tiffany Ricks',
          occupation: 'Health & Wellness Coach',
        },
        review:
          "Gondli has completely transformed how I manage my wellness routine. The connections I've made here have been life-changing!",
      },
      {
        author: {
          image: '/images/connections/evelyn-greenholt.png',
          name: 'Evelyn Greenholt',
          occupation: 'Spa Owner',
        },
        review:
          'Running my spa through Gondli has been a seamless experience from day one. The platform’s features are incredibly intuitive and designed with both the client and provider in mind. I can easily manage bookings, track client preferences, and even promote special offers to my loyal customers. Gondli has streamlined my operations and freed up more time for me to focus on what I love—providing exceptional services to my clients. The positive feedback I’ve received since joining has been overwhelming, and I owe much of it to Gondli’s thoughtful approach to wellness management.',
      },
      {
        author: {
          image: '/images/connections/olivia-hartmann.png',
          name: 'Daren Jacobi',
          occupation: 'Wellness Consultant',
        },
        review:
          'As a wellness consultant, I appreciate how Gondli connects me with clients who are serious about their health. The platform has been invaluable for my business.',
      },
    ],
    [
      {
        author: {
          image: '/images/connections/daniel-richards.png',
          name: 'Daniel Richards',
          occupation: 'Certified Yoga Instructor',
        },
        review:
          "As a yoga instructor, Gondli has been a game-changer for my business. The platform's tools allow me to manage my schedule, connect with clients, and offer special promotions with ease. I’ve seen a significant increase in bookings since joining, and what’s even more rewarding is the quality of the clients I’m attracting. They’re engaged, committed, and aligned with what I offer. Gondli has truly helped me reach people who appreciate the value of what I do, and it's made my work more fulfilling.",
      },
      {
        author: {
          image: '/images/connections/violet-little.png',
          name: 'Violet Little',
          occupation: 'Holistic Therapist',
        },
        review:
          'Gondli’s focus on fostering real connections between clients and providers is what sets it apart. I’ve always believed that wellness is more than just a service; it’s about creating lasting relationships that support long-term health and happiness. Gondli gets that.',
      },
      {
        author: {
          image: '/images/connections/bob-altenwerth.png',
          name: 'Ren Ondrika',
          occupation: 'Chiropractor',
        },
        review:
          'Using Gondli has revolutionized how I approach my wellness practice. The platform’s comprehensive features make managing my appointments and client preferences incredibly straightforward. I’ve noticed a significant increase in client engagement and satisfaction since I started using Gondli.',
      },
    ],
    [
      {
        author: {
          image: '/images/connections/olivia-hartmann.png',
          name: 'Olivia Hartmann',
          occupation: 'Nutritionist',
        },
        review:
          'I love how Gondli personalizes my experience. Every recommendation feels like it was made just for me. Whether I’m looking for a new massage therapist or a wellness retreat, Gondli always points me in the right direction.',
      },
      {
        author: {
          image: '/images/connections/bob-altenwerth.png',
          name: 'Bob Altenwerth',
          occupation: 'Personal Trainer',
        },
        review:
          'Gondli has simplified my search for top wellness services. The personalized recommendations have helped me find exactly what I need to stay healthy and balanced.',
      },
      {
        author: {
          image: '/images/connections/tiffany-ricks.png',
          name: 'Travis Satterfield',
          occupation: 'Health Coach',
        },
        review:
          'Gondli has been a fantastic tool for both discovering and managing wellness services. As a health coach, I’ve found that the platform not only helps me connect with clients who are committed to their wellness journey but also streamlines my scheduling and client interactions.',
      },
      {
        author: {
          image: '/images/connections/violet-little.png',
          name: 'Violet Little',
          occupation: 'Holistic Therapist',
        },
        review:
          'Gondli’s focus on fostering real connections between clients and providers is what sets it apart. I’ve always believed that wellness is more than just a service; it’s about creating lasting relationships that support long-term health and happiness. Gondli gets that.',
      },
    ],
  ];

  return (
    <SectionWrapper
      id='connections'
      className='relative space-y-10 bg-surface-brand px-0 pb-240 text-white sm:space-y-15 sm:pb-220'
    >
      <div className='space-y-8 px-3.5 text-center sm:space-y-6 lg:px-0'>
        <SectionTitle>{t('connections-title')}</SectionTitle>
        <SectionDescription className='mx-auto max-w-212.5'>
          {t('connections-description')}
        </SectionDescription>
      </div>
      <div className='absolute -bottom-64 left-0 flex w-full justify-center gap-6 sm:-bottom-44'>
        {reviews.map((column, index) => (
          <div key={index} className='flex w-100 flex-col gap-6'>
            {column.map(({ author, review }, index) => (
              <div
                key={index}
                className='relative flex w-75 flex-col gap-6 rounded-xl bg-feature p-5 pb-7 backdrop-blur-2.5xl sm:w-100'
              >
                <div className='flex w-full gap-3'>
                  <Image
                    src={author.image}
                    alt={author.name}
                    width={72}
                    height={72}
                    quality={100}
                    className='h-9 w-9 rounded-full'
                  />
                  <div className='flex h-full flex-col justify-between text-sm'>
                    <p className='font-medium'>{author.name}</p>
                    <p className='text-situational-secondary'>
                      {author.occupation}
                    </p>
                  </div>
                </div>
                <div className='flex gap-5.5 pl-2.5'>
                  <Quotes className='shrink-0' />
                  <p className='text-sm'>{review}</p>
                </div>
                <div className='glass-border before:rounded-xl' />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='absolute bottom-0 left-0 h-33 w-full bg-gradient-to-t from-surface-brand to-transparent' />
    </SectionWrapper>
  );
}
