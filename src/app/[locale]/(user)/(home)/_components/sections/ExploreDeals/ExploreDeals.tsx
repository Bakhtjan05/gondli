'use client';
import React, { useEffect, useState } from 'react';
import './ExploreDeals.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import Link from 'next/link'; // Import Link for navigation
import { useLocale, useTranslations } from 'next-intl';

// Define the interface for the API data
interface Listing {
  listing_id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  service_price_min: number | null;
  service_price_max: number | null;
  image_src: string | null;
  services: string[] | null;
  price_range: string | null;
}

const ExploreDeals: React.FC = () => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const t = useTranslations();

  // Fetch data from the API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/wellness-listings/',
        );
        const data = await response.json();

        // Add additional properties like price range if needed
        const transformedData = data.map((listing: Listing) => ({
          ...listing,
          price_range:
            listing.service_price_min && listing.service_price_max
              ? `$${listing.service_price_min} - $${listing.service_price_max}`
              : 'N/A',
          services: listing.services || ['No services listed'],
          image_src: listing.image_src || '/images/home/deal-placeholder.svg', // Placeholder image if null
        }));

        setListings(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setIsLoading(false); // Hide loader even if there's an error
      }
    };

    fetchListings();
  }, []);

  return (
    <div className='exploreDeals'>
      <div className='container'>
        <div className='title'>
          <h2>{t('explore-deals')}</h2>
        </div>
        {isLoading ? (
          <Loader className='sliderLoader' />
        ) : (
          <Swiper
            loop={true}
            slidesPerView={4}
            spaceBetween={15}
            navigation={true}
            speed={500}
            modules={[Navigation]}
            className='exploreDealsSwiper'
            breakpoints={{
              1400: { slidesPerView: 4, spaceBetween: 15 },
              1000: { slidesPerView: 4, spaceBetween: 15 },
              600: { slidesPerView: 3, spaceBetween: 15 },
              0: { slidesPerView: 1, spaceBetween: 10, centeredSlides: false },
            }}
          >
            {listings.map((item) => (
              <SwiperSlide key={item.listing_id} className='swiper-slide'>
                <Link href={`/${locale}/wellnessService`}>
                  <div className='image-wrapper'>
                    <div className='banner'>
                      <Image
                        priority
                        width={100}
                        height={100}
                        className='main-img'
                        src={
                          item.image_src || '/images/home/deal-placeholder.svg'
                        }
                        alt={item.name}
                      />
                      <Image
                        priority
                        width={32}
                        height={32}
                        className='heart'
                        src='/images/home/heart.svg'
                        alt='heart'
                      />
                    </div>
                    <h2 className='slide-title'>{item.name}</h2>
                    <div className='additional-info'>
                      <div className='service'>
                        {item.services!.map((service, i) => (
                          <span key={i}>{service}</span>
                        ))}
                      </div>
                      <div className='info'>
                        <span className='rating'>
                          <Image
                            priority
                            width={12}
                            height={12}
                            src='/images/home/star.svg'
                            alt='star'
                          />{' '}
                          {item.rating}
                        </span>
                        <span className='price'>{item.price_range}</span>
                        <span className='location'>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ExploreDeals;
