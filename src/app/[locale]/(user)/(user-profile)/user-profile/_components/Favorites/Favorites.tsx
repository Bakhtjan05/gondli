'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './Favorites.scss';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/types/auth';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, selectUpcomingPageState } from '@/slices/upcomingPageSlice';

type FavoriteItem = {
  id: number;
  title: string;
  category: string[];
  rating: number;
  price: string;
  location: string;
  imageUrl: string;
  isFavorite: boolean;
};

const Favorite = () => {
  const [filter, setFilter] = useState('All');
  const t = useTranslations();
  const dispatch = useDispatch();


  const { token } = useAuth();
  const [dataVenues, setDataVenues] = useState(null);
  const [dataDigital, setDataDigital] = useState(null);
  const [error, setError] = useState(null);



  const favorites: FavoriteItem[] = [
    {
      id: 1,
      title: 'Harmony Haven Wellness Center',
      category: ['Yoga', 'Fitness', 'Detox'],
      rating: 4.5,
      price: '$35',
      location: 'Seattle',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: true,
    },
    {
      id: 2,
      title: 'Serenity Spa Retreat',
      category: ['Massage', 'Meditation', 'Workshops'],
      rating: 4.2,
      price: '$55',
      location: 'Ego',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Renewal Fitness Hub',
      category: ['Fitness', 'Wellness'],
      rating: 4.8,
      price: '$25',
      location: 'Orlando',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: true,
    },
    {
      id: 4,
      title: 'Harmony Haven Wellness Center',
      category: ['Yoga', 'Fitness', 'Detox'],
      rating: 4.5,
      price: '$35',
      location: 'Seattle',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: true,
    },
    {
      id: 5,
      title: 'Serenity Spa Retreat',
      category: ['Massage', 'Meditation', 'Workshops'],
      rating: 4.2,
      price: '$55',
      location: 'Ego',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Renewal Fitness Hub',
      category: ['Fitness', 'Wellness'],
      rating: 4.8,
      price: '$25',
      location: 'Orlando',
      imageUrl: '/images/content/image-content.jpg',
      isFavorite: true,
    },
  ];

  const backToNavbar = () => {
    dispatch(setIsUpcomingPage(false))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataVenues(response.data.venues || []); // Сохраняем данные в состоянии
      } catch (err) {
        setError(err.response?.data || err.message); // Обрабатываем ошибку
      }
    };

    fetchData();
  }, []); // [] означает, что запрос будет выполнен только один раз при монтировании компонента

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataDigital(response.data.digital_contents || []); // Сохраняем данные в состоянии
      } catch (err) {
        setError(err.response?.data || err.message); // Обрабатываем ошибку
      }
    };

    fetchData();
  }, []); // [] означает, что запрос будет выполнен только один раз при монтировании компонента

  return (
    <div className='favorites-container'>
      <div className='header'>
        <div className='flex items-center gap-[10px]' onClick={backToNavbar}>
          <div className='lg:hidden'>
            <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
          </div>
          <h2 className='title  max-lg:!text-xl'>{t(`favorites`)}</h2>
        </div>
        <div className='filter-buttons max-lg:!hidden'>
          {['All', 'Venues', 'Digital Content'].map((filterOption) => (
            <button
              key={filterOption}
              className={`filter-button ${filter === filterOption ? 'active btn-active' : 'non-active-btn'}`}
              onClick={() => setFilter(filterOption)}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      <div className='favorites-grid'>
        {favorites.map((item) => (
          <div key={item.id} className='favorite-card'>
            <div className='image-container'>
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout='responsive'
                width={410}
                height={230}
                objectFit='contain'
                className='favorite-image'
              />
              <div className='heat-wrapper max-lg:!hidden'>
                <Image
                  src='/images/home/heat.svg'
                  alt='Fire icon'
                  width={16}
                  height={16}
                  className='icon fire-icon'
                />
              </div>
              <div className='like-bg'></div>
              <Image
                src='/images/content/like2.svg'
                alt='Like icon'
                width={16}
                height={16}
                className='icon like-icon'
              />
            </div>
            <div className='favorite-content'>
              <h3 className='favorite-title'>{item.title}</h3>
              <div className='favorite-category'>
                {item.category.map((cat, index) => (
                  <span key={index}>
                    {cat}
                    {index < item.category.length - 1 && (
                      <span className='separator'> • </span>
                    )}
                  </span>
                ))}
              </div>
              <div className='favorite-details'>
                <span className='favorite-rating'>
                  <Image
                    priority
                    width={12}
                    height={12}
                    src='/images/home/star.svg'
                    alt='star'
                  />{' '}
                  {item.rating}
                </span>
                <span className='separator'> • </span>
                <span className='favorite-price'>{item.price}</span>
                <span className='separator'> • </span>
                <span className='favorite-location'>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
