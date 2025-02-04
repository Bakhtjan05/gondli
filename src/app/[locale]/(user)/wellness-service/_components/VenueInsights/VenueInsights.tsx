'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import './VenueInsights.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTranslations } from 'next-intl';
interface SlideData {
  title: string;
  imageSrc: string;
  rating: number;
}

const slideData: SlideData[] = [
  {
    title: 'Winifred Wuckert',
    imageSrc: '/images/content/user1.svg',
    rating: 8.5,
  },
  {
    title: 'Rachael Bogisich',
    imageSrc: '/images/content/user2.svg',
    rating: 9.2,
  },
  {
    title: 'Witney Dicki',
    imageSrc: '/images/content/user3.svg',
    rating: 8.4,
  },
  {
    title: 'Winifred Wuckert',
    imageSrc: '/images/content/user4.svg',
    rating: 8.5,
  },
  {
    title: 'Rachael Bogisich',
    imageSrc: '/images/content/user5.svg',
    rating: 9.2,
  },
  {
    title: 'Witney Dicki',
    imageSrc: '/images/content/user3.svg',
    rating: 8.4,
  },
];
const ambassadors = [
  {
    id: 1,
    name: 'Madelina H.',
    visits: 15,
    rank: 1,
    badgeSrc: '/images/notifications/badge.svg',
    userSrc: '/images/home/user.svg',
  },
  {
    id: 2,
    name: 'Madelina H.',
    visits: 15,
    rank: 2,
    badgeSrc: '/images/notifications/badge.svg',
    userSrc: '/images/home/user.svg',
  },
  {
    id: 3,
    name: 'Madelina H.',
    visits: 15,
    rank: 3,
    badgeSrc: '/images/notifications/badge.svg',
    userSrc: '/images/home/user.svg',
  },
];

const digitalContent = [
  {
    id: 1,
    title: 'Pilates Workshop',
    rating: 9.2,
    duration: '44 Minutes',
    imageSrc: '/images/services/digital1.svg',
    playIconSrc: '/images/services/digitalPlay.svg',
  },
  {
    id: 2,
    title: 'Strength Workout',
    rating: 9.2,
    duration: '44 Minutes',
    imageSrc: '/images/services/digital2.svg',
    playIconSrc: '/images/services/digitalPlay.svg',
  },
  {
    id: 3,
    title: 'Emily’s Yoga Workshop',
    rating: 9.2,
    duration: '44 Minutes',
    imageSrc: '/images/services/digital3.svg',
    playIconSrc: '/images/services/digitalPlay.svg',
  },
];
const VenueInsights: React.FC<{ showModal: boolean; onClose: () => void }> = ({
  showModal,
  onClose,
}) => {
  const t = useTranslations();

  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsNavigationEnabled(window.innerWidth > 1024);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={onClose}
      centered
      className='venue-insights-modal'
      size='lg'
    >
      <Modal.Body>
        <div className='venue-insights-content'>
          <div className='header flex justify-between items-center px-[20px] py-6 lg:hidden'>
            <Image src={"/images/icons/booking-logo.png"} alt='' width={101} height={22} />
            <button onClick={onClose}>
              <Image src={"/images/icons/booking-x.svg"} alt='' width={20} height={20} />
            </button>
          </div>
          <div className='venueBlock'>
            <div className='venue-badge flex-col items-center mb-7'>
              <Image
                priority
                src='/images/services/vitraLogo.svg'
                alt='Verified Badge'
                width={60}
                height={60}
              />
              <div className='flex flex-col justify-center lg:hidden mt-4'>
                <h3 className='heading flex text-center justify-center mb-3 font-bold'>
                  Vitra{' '}
                  <Image
                    priority
                    src='/images/services/verify.svg'
                    alt='Verified Badge'
                    width={14}
                    height={14}
                  />
                </h3>
                <p className='text-center'>
                  Step into blissful rejuvenation with Vitra, your premier
                  destination for holistic wellness and self-care. 🌸🧘‍♀️ Discover a
                  sanctuary where mind, body, and soul unite to restore balance
                  and vitality, guiding you on a journey to holistic well-being.
                </p>
              </div>
            </div>
            <div className='map-section lg:!hidden'>
              <Image
                priority
                className='cross'
                src='/images/services/close.svg'
                alt='close'
                width={32}
                height={32}
              />
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10808.062410989867!2d8.513875599999999!3d47.37261395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a219f017771%3A0xe4891d7f6ec549df!2s8003%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2s!4v1729464824176!5m2!1sen!2s'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>

              <button className='get-directions-btn'>
                <Image
                  priority
                  src='/images/services/direction.svg'
                  alt='Badge'
                  width={20}
                  height={20}
                />
                {t('get-directions')}
              </button>
            </div>
            <div className='venue-description max-lg:!mt-9'>
              <h3 className='heading max-lg:!hidden'>
                Vitra{' '}
                <Image
                  priority
                  src='/images/services/verify.svg'
                  alt='Verified Badge'
                  width={14}
                  height={14}
                />
              </h3>
              <p className='text-center max-lg:!hidden'>
                Step into blissful rejuvenation with Vitra, your premier
                destination for holistic wellness and self-care. 🌸🧘‍♀️ Discover a
                sanctuary where mind, body, and soul unite to restore balance
                and vitality, guiding you on a journey to holistic well-being.
              </p>


              <table className='working-hours'>
                <thead>
                  <tr>
                    <th>{t('working_days')}</th>
                    <th>{t('working_hours')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t('monday')}</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>{t('tuesday')}</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>{t('wednesday')}</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>{t('thursday')}</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>{t('friday')}</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>{t('saturday')}</td>
                    <td>09:00 - 14:00</td>
                  </tr>
                  <tr>
                    <td>{t('sunday')}</td>
                    <td className='close !text-red-600'>{t('closed')}</td>
                  </tr>
                </tbody>
              </table>
              <div className='masseaures'>
                <div className='title'>
                  <h2 className='max-lg:!text-base'>{t('measures')}</h2>
                </div>
                <Swiper
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  slidesPerView={3}
                  spaceBetween={10}
                  navigation={isNavigationEnabled}
                  speed={500}
                  modules={[Autoplay, Navigation]}
                  className='exploreDealsSwiper'
                  breakpoints={{
                    1400: { slidesPerView: 3, spaceBetween: 10 },
                    1000: { slidesPerView: 3, spaceBetween: 10 },
                    600: { slidesPerView: 3, spaceBetween: 10 },
                    0: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                      centeredSlides: false,
                    },
                  }}
                >
                  {slideData.map((item, index) => (
                    <SwiperSlide key={index} className='swiper-slide'>
                      <div className='image-wrapper'>
                        <div className='banner'>
                          <Image
                            priority
                            width={100}
                            height={100}
                            className='main-img'
                            src={item.imageSrc}
                            alt={item.title}
                          />
                        </div>
                        <h2 className='slide-title max-lg:!text-sm'>{item.title}</h2>
                        <div className='additional-info'>
                          <div className='info'>
                            <span className='rating max-lg:!text-sm'>
                              <Image
                                priority
                                width={12}
                                height={12}
                                src='/images/home/star.svg'
                                alt='star'
                              />{' '}
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className='embasador'>
                <h3 className='max-lg:!text-base'>{t('ambassadors')}</h3>
                {ambassadors.map((ambassador) => (
                  <div
                    key={ambassador.id}
                    className={`badgeContent ${ambassador.rank === 1 ? 'active' : ''}`}
                  >
                    <div className='content'>
                      <div className='d-flex align-items-center'>
                        <div className='flex-shrink-0'>
                          <Image
                            priority
                            src={ambassador.userSrc}
                            width={40}
                            height={40}
                            alt='User'
                          />
                        </div>
                        <div className='flex-grow-1 ms-2'>
                          <p className='align-items-center flex'>
                            <b>{ambassador.name}</b>
                            <Image
                              priority
                              className='ms-1'
                              src={ambassador.badgeSrc}
                              width={17}
                              height={17}
                              alt='Badge'
                            />
                          </p>
                          <p>
                            {t('visited')} Vitra{' '}
                            <b>{ambassador.visits} times</b>
                          </p>
                        </div>
                      </div>
                      <span>{ambassador.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='digital'>
                <h3 className='max-lg:!text-base'>{t('offer-digital-content')}</h3>
                {digitalContent.map((content) => (
                  <div key={content.id} className='badgeContent'>
                    <div className='content'>
                      <div className='d-flex align-items-center'>
                        <div className='flex-shrink-0'>
                          <Image
                            priority
                            src={content.imageSrc}
                            className='mainImg'
                            width={83}
                            height={83}
                            alt='Digital Content'
                          />
                        </div>
                        <div className='flex-grow-1 ms-2'>
                          <p className='align-items-center flex'>
                            <b>{content.title}</b>
                          </p>
                          <div className='info'>
                            <span className='rating'>
                              <Image
                                priority
                                width={12}
                                height={12}
                                src='/images/home/star.svg'
                                alt='star'
                              />{' '}
                              {content.rating}
                            </span>
                            <span className='minute'>{content.duration}</span>
                          </div>
                        </div>
                      </div>
                      <span>
                        <Image
                          priority
                          src={content.playIconSrc}
                          width={19}
                          height={19}
                          alt='Play'
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='map-section max-lg:!hidden'>
            <Image
              priority
              className='cross'
              onClick={onClose}
              src='/images/services/close.svg'
              alt='close'
              width={32}
              height={32}
            />
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10808.062410989867!2d8.513875599999999!3d47.37261395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a219f017771%3A0xe4891d7f6ec549df!2s8003%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2s!4v1729464824176!5m2!1sen!2s'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>

            <button className='get-directions-btn'>
              <Image
                priority
                src='/images/services/direction.svg'
                alt='Badge'
                width={20}
                height={20}
              />
              {t('get-directions')}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VenueInsights;
