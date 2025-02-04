import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './BadgeModal.scss';
import { Check, Lock, X } from '@/icons';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sliderData = [
    {
      category: 'Rookie Badge Challenges',
      imgUrl: '/images/content/badge1.svg',
      status: 'Applied',
      progress: [
        {
          label: 'Book and attend 5 yoga classes within a month',
          count: 5,
          target: 5,
        },
        { label: 'Refer 3 Friends on Gondli', count: 3, target: 3 },
        {
          label: 'Spend watching 60 minutes of yoga digital content',
          count: 60,
          target: 60,
        },
      ],
    },
    {
      category: 'Elite Badge Challenges',
      imgUrl: '/images/content/badge3.svg',
      status: 'Not-Applied',
      progress: [
        {
          label: 'Book and attend 10 yoga classes within a month',
          count: 5,
          target: 10,
        },
        { label: 'Refer 5 Friends on Gondli', count: 3, target: 5 },
        {
          label: 'Spend watching 120 minutes of yoga digital content',
          count: 60,
          target: 120,
        },
      ],
    },
    {
      category: 'Master Badge Challenges',
      imgUrl: '/images/content/badge2.svg',
      status: 'Not-Applied',
      progress: [
        {
          label: 'Book and attend 20 yoga classes within a month',
          count: 5,
          target: 20,
        },
        { label: 'Refer 10 Friends on Gondli', count: 3, target: 10 },
        {
          label: 'Spend watching 240 minutes of yoga digital content',
          count: 60,
          target: 240,
        },
      ],
    },
  ];

  const getProgressData = (category: string) => {
    const badge = sliderData.find((b) => b.category === category);
    return badge ? badge.progress : [];
  };

  const renderBadgeContent = (badge: any) => {
    return (
      <div className='badgeContent'>
        <div className='badgeHeading'>
          <img src={badge.imgUrl} alt='Badge Icon' className='badgeIcon' />
          <h3 className='badge-category'>{badge.category}</h3>
          <p className='badge-benefit'>
            Earn{' '}
            <span className='text-highlight font-semibold'>
              {badge.status === 'Applied' ? '1.5x points' : '2x points'}
            </span>{' '}
            and discounts while booking yoga classes
          </p>
          <div>
            {badge.status === 'Applied' ? (
              <div className='applied'>
                <Check />
                <div>Applied</div>
              </div>
            ) : (
              <div className='not-applied'>
                <Lock />
                <div>Apply</div>
              </div>
            )}
          </div>
        </div>

        <div className='progressContainer'>
          {getProgressData(badge.category).map((item, i) => (
            <div key={i} className='progressItem'>
              <div className='progress-label'>
                <div>{item.label}</div>
                <div>
                  <span>
                    {item.count}/{item.target}
                  </span>
                </div>
              </div>
              <div className='progressBar'>
                <div
                  className='progressFill'
                  style={{
                    width: `${(item.count / item.target) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <button onClick={onClose} className='closeButton'>
          <X />
        </button>

        <div className='badgeHeader'>
          <h2>Badges</h2>
          <div className='tabContainer'>
            <span className='activeTab'>Yoga Enthusiast</span>
            <span>Fitness Fanatic</span>
            <span>Meditation Maven</span>
            <span>Spa Aficionado</span>
            <span>Mind-Body</span>
          </div>
        </div>

        <Swiper
          className='swiper'
          spaceBetween={10}
          slidesPerView={1}
          navigation
          modules={[Navigation]}
        >
          {sliderData.map((badge, index) => (
            <SwiperSlide className='swiperSlide' key={index}>
              {renderBadgeContent(badge)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BadgeModal;
