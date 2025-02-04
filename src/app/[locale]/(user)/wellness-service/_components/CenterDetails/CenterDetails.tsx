'use client';

import React, { useEffect, useState } from 'react';
import './CenterDetails.scss';
import Image from 'next/image';
import Booking from '../Booking/Booking';
import Reviews from '../../../digitalContent/_components/Reviews/Reviews';
import Amenities from '../Amenities/Amenities';
import Location from '../Location/Location';
import RecentUpdateModal from '../RecentUpdateModal/RecentUpdateModal';
import VenueInsights from '../VenueInsights/VenueInsights';
import { useTranslations } from 'next-intl';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setServicesData, setGroupedServices, selectUpcomingPageState } from '@/slices/upcomingPageSlice';




interface CenterDetailsProps {
  serviceId: string; // Принимаем ID сервиса как пропс
}


interface Service {
  name: string;
  duration: string;
  price: string;
}

interface Category {
  name: string;
  services: Service[];
}


const CenterDetails: React.FC<CenterDetailsProps> = ({ serviceId }) => {
  const t = useTranslations();
  const router = useRouter();


  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [upadateShowModal, setUpadateShowModal] = useState(false);
  const [venueInsightsModal, setVenueInsightsModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { groupedServices, servicesData } = useSelector(selectUpcomingPageState);




  const images = [
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
    "/images/services/mainBanner.jpg",
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/service-providers/${serviceId}`);

        const services = response.data?.services || [];

        const grouped = services.reduce((acc: Record<string, any[]>, service: any) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push(service);
          return acc;
        }, {});

        localStorage.setItem('servicesData', JSON.stringify(response.data));
        localStorage.setItem('groupedServices', JSON.stringify(grouped));

        dispatch(setServicesData(response.data));
        dispatch(setGroupedServices(grouped));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleModalOpen = () => {
    setUpadateShowModal(true); // Show the modal when the title is clicked
  };
  const handleModalClose = () => {
    setUpadateShowModal(false); // Hide the modal when the close button is clicked
  };
  const handleVenueInsightsOpen = () => {
    setVenueInsightsModal(true); // Show the venue insights modal
  };
  const handleVenueInsightsClose = () => {
    setVenueInsightsModal(false); // Hide the venue insights modal
  };
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };


  return (
    <React.Fragment>
      <div className='centerDetails'>
        <div className="slider relative w-full  max-w-2xl mx-auto">
          {/* Slider */}
          <Swiper
            modules={[Navigation]}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className=" overflow-hidden "
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={375}
                  height={211}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[211px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='absolute left-4 top-3'>
            <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
              <Image src={"/images/icons/wellness-left.svg"} alt='' width={16} height={16} />
            </div>
          </div>

          <div className='absolute flex gap-3 top-3 right-4'>
            <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
              <Image src={"/images/icons/wellness-upload.svg"} alt='' width={16} height={16} />
            </div>
            <div className='heart-icon-block w-8 h-8 rounded-full bg-[#0000004D] flex justify-center items-center'>
              <Image src={"/images/icons/wellness-heart.svg"} alt='' width={16} height={16} />
            </div>
          </div>

          {/* Pagination */}
          <div className="absolute blake z-10 bottom-3 left-1/2 transform -translate-x-1/2  text-white ">
            <div className='heart-icon-block w-auto h-auto px-[10px] py-[6px] rounded-full bg-[#0000004D] flex justify-center items-center'>
              <p className='max-lg:!text-xs'>{currentIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='header-wellness'>
            <div className='title-wellness'>
              <h2 className=''>{servicesData?.name}</h2>
              <div className='info'>
                <span className='rating max-lg:!text-sm'>
                  <Image
                    priority
                    width={12}
                    height={12}
                    src='/images/home/star.svg'
                    alt='star'
                  />{' '}
                  8.5
                </span>
                <span className='minute max-lg:!text-sm'>$$<span className='#878E97'>$$</span></span>
                <span className='minute max-lg:!text-sm '>44 Minutes</span>
              </div>
            </div>
            <div className='likeUpload'>
              <button className='upload'>
                <Image
                  priority
                  width={40}
                  height={40}
                  src='/images/content/upload.svg'
                  alt='upload'
                />
              </button>
              <button className='like'>
                <Image
                  priority
                  width={40}
                  height={40}
                  src='/images/content/like.svg'
                  alt='like'
                />
              </button>
            </div>
          </div>
          <div className='row g-2'>
            <div className='col-lg-8 mt-2'>
              <div className='serviceBanner'>
                <Image
                  priority
                  src='/images/services/mainBanner.jpg'
                  width={788}
                  height={442}
                  alt='mainBanner'
                />
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='row g-2'>
                <div className='col-lg-12 mt-2'>
                  <div className='blurBlock'>
                    <Image
                      priority
                      className='mainImg'
                      src='/images/services/grid1.svg'
                      width={100}
                      height={100}
                      alt='grid1'
                    />
                  </div>
                </div>
                <div className='col-lg-6 mt-2'>
                  <div className='blurBlock'>
                    <Image
                      priority
                      className='mainImg'
                      src='/images/services/grid2.svg'
                      width={100}
                      height={100}
                      alt='grid2'
                    />
                    <div className='storyContent'>
                      <Image
                        priority
                        src='/images/services/photos.svg'
                        width={100}
                        height={100}
                        alt='photos'
                      />
                      <p>{t('see-photos')}</p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 mt-2'>
                  <div className='blurBlock'>
                    <Image
                      priority
                      className='mainImg'
                      src='/images/services/grid3.svg'
                      width={100}
                      height={100}
                      alt='grid3'
                    />
                    <div className='storyContent'>
                      <Image
                        priority
                        src='/images/services/story.svg'
                        width={100}
                        height={100}
                        alt='story'
                      />
                      <p>{t('featured-stories')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='aboutClass'>
                <h3>{t('about-space')}</h3>
                <p className='max-lg:!text-sm'>
                  Welcome to Harmony Haven, where tranquility meets rejuvenation
                  in the heart of Zurichs serene Seefeld district. Nestled in
                  the midst of picturesque landscapes and overlooking the
                  calming waters of Lake Zurich, our wellness center is a
                  sanctuary dedicated to enhancing your overall well-being. At
                  Harmony Haven,{' '}
                  {isExpanded ? (
                    <>we... </>
                  ) : (
                    'we believe in the power of balance. Welcome to Harmony Haven, where tranquility meets rejuvenation in the heart of Zurichs serene Seefeld district. Nestled in the midst of picturesque landscapes and overlooking the calming waters of Lake Zurich, our wellness center is a sanctuary dedicated to enhancing your overall well-being. '
                  )}
                  <button className='read-more font-medium' onClick={toggleReadMore}>
                    {isExpanded ? t('readMore') : t('readLess')}
                  </button>
                </p>
                <div className='insights'>
                  <div className='info'>
                    <div className='logo' onClick={handleModalOpen}>
                      <Image
                        priority
                        width={40}
                        height={40}
                        src='/images/searchInput/virta.png'
                        alt='merck'
                      />
                    </div>
                    <div>
                      <p className='title max-lg:!text-sm'>
                        {t('hosted-by')} Vitra{' '}
                        <Image
                          priority
                          width={14}
                          height={14}
                          src='/images/services/verify.svg'
                          alt='verify'
                        />
                      </p>
                      <p className='since max-lg:!text-xs'>{t('member-since')} 16 Aug, 2023</p>
                    </div>
                  </div>
                  <div className='followInsight'>
                    <div className='buttons'>
                      <button className='max-lg:!text-sm' onClick={handleVenueInsightsOpen}>
                        {t('venue-insights')}
                      </button>
                      <button className='max-lg:!text-sm' onClick={toggleDropdown}>
                        {isDropdownOpen ? t('following') : t('follow')}{' '}
                        <Image
                          priority
                          src='/images/content/arrowDown.svg'
                          width={8}
                          height={4}
                          alt='arrowDown'
                        />
                      </button>
                      {isDropdownOpen && (
                        <div className='dropdown'>
                          <div className='dropdown-item max-lg:!text-sm'>
                            {' '}
                            <Image
                              priority
                              src='/images/content/notifications.svg'
                              width={32}
                              height={32}
                              alt='notifications'
                            />
                            {t('recieve-notification')}
                          </div>
                          <div className='dropdown-item max-lg:!text-sm'>
                            {' '}
                            <Image
                              priority
                              src='/images/content/block.svg'
                              width={32}
                              height={32}
                              alt='block'
                            />
                            {t('without-notification')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='service'>
                <h3 className='font-medium'>{t('services')}</h3>
                {Object.entries(groupedServices).map(([category, services]) => (
                  <div key={category}>
                    <h3 className='font-medium'>{category}</h3>
                    <ul className='wellness-ul'>
                      {Array.isArray(services) && services.map((service, idx) => (
                        <li className='wellness-li' key={idx}>
                          <div className='info'>
                            <p className='max-lg:!text-sm max-lg:!max-w-[218px] whitespace-nowrap overflow-hidden text-ellipsis'>
                              {service.name}
                            </p>
                            <span>{service.duration} Minutes</span>
                          </div>
                          <div className='time'>
                            <p className='max-lg:!text-sm'>{service.price} CHF</p>
                            <span>{t('per-session')}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Amenities />
              <Location />
              <Reviews />
            </div>
            <div className='col-lg-4 max-lg:hidden'>
              <Booking groupedServices={groupedServices} />
            </div>
          </div>
        </div>
      </div>
      <RecentUpdateModal
        showModal={upadateShowModal}
        onClose={handleModalClose}
      />
      <VenueInsights
        showModal={venueInsightsModal}
        onClose={handleVenueInsightsClose}
      />
    </React.Fragment>
  );
};

export default CenterDetails;
