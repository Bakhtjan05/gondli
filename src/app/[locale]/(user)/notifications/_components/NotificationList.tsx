'use client';

import React, { useState } from 'react';
import './NotificationList.scss';
import Image from 'next/image';
import NotificationsModal from '../NotificationsModal/NotificationsModal';
import { useTranslations } from 'next-intl';
const notificationsData = [
  {
    id: 1,
    message:
      'Congratulations! You have been selected as [Top Ambassador] by [Spavitality Haven]. Click to make a decision if you would like to show it off or not.',
    time: '3m ago',
    logo: '/images/notifications/stripe.svg',
    mark: '/images/notifications/star.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: true,
    active: true,
    modal: true,
  },
  {
    id: 2,
    message:
      'Congratulations! Your booking got accepted by [Harmony Haven Spa center]',
    time: '5m ago',
    logo: '/images/notifications/spa.svg',
    mark: '/images/notifications/checkNoti.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: true,
    active: true,
    modal: false,
  },
  {
    id: 3,
    message:
      "[Pure Pilates Oasis] replied back on your comment: 'When is the next free time for booking?'",
    time: '1h ago',
    logo: '/images/notifications/airbnb.svg',
    mark: '/images/notifications/comment.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: true,
    active: true,
    modal: false,
  },
  {
    id: 4,
    message:
      "[Pure Pilates Oasis] replied back on your comment: 'Wow Is this happening today?'",
    time: '1h ago',
    logo: '/images/notifications/airbnb.svg',
    mark: '/images/notifications/comment.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 5,
    message:
      'Congratulations! Your booking got accepted by [Spavitality Haven]',
    time: '2h ago',
    logo: '/images/notifications/stripe.svg',
    mark: '/images/notifications/checkNoti.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 6,
    message:
      'Check out the new Digital Content on Gondli available for pro members only.',
    time: '5h ago',
    logo: '/images/notifications/digitalContent.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 7,
    message:
      'Congratulations! You received a [20% sale] on your next booking for [Spa & Harmony Heights]',
    time: '5h ago',
    logo: '/images/notifications/twitch.svg',
    mark: '/images/notifications/booking.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 8,
    message:
      'Congratulations! Your booking got accepted by [Harmony Haven Spa center]',
    time: '6h ago',
    logo: '/images/notifications/spa.svg',
    mark: '/images/notifications/checkNoti.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 9,
    message:
      "[Pure Pilates Oasis] replied back on your comment: 'When is the next free time for booking?'",
    time: '1d ago',
    logo: '/images/notifications/airbnb.svg',
    mark: '/images/notifications/comment.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 10,
    message:
      "[Pure Pilates Oasis] replied back on your comment: 'Wow Is this happening today?'",
    time: '1d ago',
    logo: '/images/notifications/airbnb.svg',
    mark: '/images/notifications/comment.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 11,
    message:
      'Congratulations! Your booking got accepted by [Spavitality Haven]',
    time: '2d ago',
    logo: '/images/notifications/stripe.svg',
    mark: '/images/notifications/checkNoti.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 12,
    message:
      'Check out the new Digital Content on Gondli available for pro members only.',
    time: '3d ago',
    logo: '/images/notifications/digitalContent.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
  {
    id: 13,
    message:
      'Congratulations! You received a [20% sale] on your next booking for [Spa & Harmony Heights]',
    time: '4d ago',
    logo: '/images/notifications/twitch.svg',
    mark: '/images/notifications/booking.svg',
    statusIcon: '/images/notifications/active.svg',
    hasBorder: false,
    active: false,
    modal: false,
  },
];
const NotificationList: React.FC = () => {
  const t = useTranslations();
  const [notifications, setNotifications] = useState(notificationsData);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<number | null>(
    null,
  );

  const toggleDropdown = (id: number) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  // Show modal for the notification that has modal property set to true
  const handleNotificationClick = (notification: any) => {
    if (notification.modal) {
      setActiveNotification(notification.id);
      setModalVisible(true);
    }
  };

  // Mark an individual notification as read or unread (toggle)
  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              active: !notification.active,
              hasBorder: !notification.hasBorder,
            }
          : notification,
      ),
    );
    setDropdownVisible(null);
  };

  // Delete an individual notification
  const handleDelete = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
    setDropdownVisible(null);
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        active: false,
        hasBorder: false,
      })),
    );
  };

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <React.Fragment>
      <div className='notificationList'>
        <div className='container'>
          <div className='notificationsWrapper'>
            <div className='header'>
              <h2>{t('notifications')}</h2>
              <div className='btns'>
                <button className='btn' onClick={handleMarkAllAsRead}>
                  {t('markAllAsRead')}
                </button>
                <button className='btn' onClick={handleClearAll}>
                  {t('clearAll')}
                </button>
              </div>
            </div>
            <div className='list'>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    className='notificationWrap'
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className='logoContent'>
                      <div className='logoWrap'>
                        <div
                          className={`logo ${notification.hasBorder ? 'gradientBorder' : 'noBorder'}`}
                        >
                          <Image
                            width={50}
                            height={50}
                            src={notification.logo}
                            alt='logo'
                          />
                        </div>
                        {notification.mark && (
                          <Image
                            priority
                            className='mark'
                            width={100}
                            height={100}
                            src={notification.mark}
                            alt='mark'
                          />
                        )}
                      </div>
                      <div className='content'>
                        <p>
                          {notification.message
                            .split(/\[|\]/)
                            .map((part, index) => {
                              return part &&
                                (part === 'Top Ambassador' ||
                                  part === 'Spavitality Haven' ||
                                  part === 'Harmony Haven Spa center' ||
                                  part === 'Pure Pilates Oasis' ||
                                  part === '20% sale' ||
                                  part === 'Spa & Harmony Heights') ? (
                                <b key={index}>{part}</b>
                              ) : (
                                part
                              );
                            })}
                        </p>
                        <p className='time'>{notification.time}</p>
                      </div>
                    </div>
                    <div className='icons'>
                      <div
                        className={`active ${notification.active ? 'active' : 'nonActive'}`}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={notification.statusIcon}
                          alt='status'
                        />
                      </div>
                      <div className='readAll'>
                        <Image
                          width={50}
                          height={50}
                          src='/images/notifications/readBtn.png'
                          alt='readBtn'
                          onClick={() => toggleDropdown(notification.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        {dropdownVisible === notification.id && (
                          <div className='dropdown'>
                            <button
                              className='dropdown-item'
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Image
                                width={20}
                                height={20}
                                src='/images/notifications/check.svg'
                                alt='check'
                              />
                              {notification.active
                                ? t('markAsRead')
                                : t('markAsUnread')}
                            </button>
                            <button
                              className='dropdown-item'
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Image
                                width={20}
                                height={20}
                                src='/images/notifications/del.svg'
                                alt='del'
                              />
                              {t('delete')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center'>
                  <p className='mt-5 pt-5'>{t('noNotifications')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal component */}
      {modalVisible && (
        <NotificationsModal
          show={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </React.Fragment>
  );
};

export default NotificationList;
