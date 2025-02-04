'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import './recentActivities.scss';

const RecentActivities = () => {
  const t = useTranslations();
  const activitiesData = [
    {
      id: 1,
      message: t('dashboard-recentActivities-activity1'),
      time: '5m ago',
      logo: '/images/dashboard/samanthaL.svg',
      mark: '/images/notifications/star.svg',
      statusIcon: '/images/notifications/active.svg',
      hasBorder: false,
      active: true,
      modal: true,
    },
    {
      id: 2,
      message: t('dashboard-recentActivities-activity2'),
      time: '52m ago',
      logo: '/images/dashboard/jenniferA.svg',
      mark: '/images/notifications/inbox.svg',
      statusIcon: '/images/notifications/active.svg',
      hasBorder: false,
      active: true,
      modal: false,
    },
    {
      id: 3,
      message: t('dashboard-recentActivities-activity3'),
      time: '1h ago',
      logo: '/images/dashboard/jamesC.svg',
      mark: '/images/notifications/inbox.svg',
      statusIcon: '/images/notifications/active.svg',
      hasBorder: false,
      active: false,
      modal: false,
    },
    {
      id: 4,
      message: t('dashboard-recentActivities-activity4'),
      time: '1h ago',
      logo: '/images/dashboard/charlesB.svg',
      mark: '/images/notifications/star.svg',
      statusIcon: '/images/notifications/active.svg',
      hasBorder: false,
      active: false,
      modal: false,
    },
    {
      id: 5,
      message: t('dashboard-recentActivities-activity5'),
      time: '2h ago',
      logo: '/images/dashboard/shannonP.svg',
      mark: '/images/notifications/star.svg',
      statusIcon: '/images/notifications/active.svg',
      hasBorder: false,
      active: false,
      modal: false,
    },
  ];
  const [activities, setActivities] = useState(activitiesData);

  return (
    <React.Fragment>
      <div className='activityList'>
        <div className='activitiesWrapper'>
          <div className='header max-lg:!mb-5'>
            <h2 className='max-lg:!text-lg'>{t('dashboard-recentActivities-title')}</h2>
            <div className='btns'>
              <button className='btn'>See all</button>
            </div>
          </div>
          <div className='list'>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div className='activityWrap' key={activity.id}>
                  <div className='logoContent'>
                    <div className='logoWrap'>
                      <div
                        className={`logo ${activity.hasBorder ? 'gradientBorder' : 'noBorder'}`}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={activity.logo}
                          alt='logo'
                        />
                      </div>
                      {activity.mark && (
                        <Image
                          priority
                          className='mark'
                          width={100}
                          height={100}
                          src={activity.mark}
                          alt='mark'
                        />
                      )}
                    </div>
                    <div className='content'>
                      <p>
                        {activity.message.split(/\[|\]/).map((part, index) => {
                          return part &&
                            (part === 'Samantha L.' ||
                              part === 'Jennifer A.' ||
                              part === t('gentle_flow_yoga_class') ||
                              part === 'James C.' ||
                              part === t('restorative_yoga_and_meditation') ||
                              part === 'Charles B.' ||
                              part === 'Shannon P.') ? (
                            <b key={index}>{part}</b>
                          ) : (
                            part
                          );
                        })}
                      </p>
                      <p className='time'>{activity.time}</p>
                    </div>
                  </div>
                  <div className='icons'>
                    <div
                      className={`active ${activity.active ? 'active' : 'nonActive'}`}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={activity.statusIcon}
                        alt='status'
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center'>
                <p className='mt-5 pt-5'>{t('noActivities')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecentActivities;
