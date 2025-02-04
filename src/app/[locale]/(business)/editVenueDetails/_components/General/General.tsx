'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useTranslations } from 'next-intl';
import './General.scss';

const customMarkerIcon = '/images/icons/Toolbar.svg';

const pictureList = [
  { src: '/images/hero/17.jpeg', alt: 'Yoga class photo', isCover: true },
  { src: '/images/hero/18.jpeg', alt: 'Yoga practice photo' },
  { src: '/images/hero/19.jpeg', alt: 'Dance class photo' },
  { src: '/images/hero/20.jpeg', alt: 'Spa room photo' },
];

const ThreeDotsMenu = () => (
  <button className='three-dots-button'>
    <Image
      src='/images/icons/Fav-btn.svg'
      alt='menu'
      width={32}
      height={32}
      className='three-dots-icon'
    />
  </button>
);

const MapSkeleton = () => (
  <div className='map-skeleton'>
    <div className='marker-placeholder' />
    <div className='map-controls'>
      <div className='control-button' />
      <div className='control-button' />
    </div>
    <div className='skeleton-animation' />
  </div>
);

const countries = ['Switzerland', 'Germany', 'France', 'Italy'];

// Move initial state to a separate constant
const initialInput = {
  companyName: 'Vitra',
  nameOfYourVenue: 'Harmony Haven Wellness Center',
  description: '', // Will be set after translation is available
  country: '', // Will be set after translation is available
  city: '', // Will be set after translation is available
  streetAddress: '', // Will be set after translation is available
  AptSuiteEtc: '65',
  zipCode: 'CH-8003',
};

export default function General() {
  const t = useTranslations();
  const [input, setInput] = useState(initialInput);
  const [logo, setLogo] = useState('/images/logo/pencil.png');
  const [mapCenter, setMapCenter] = useState({
    lat: 47.3769,
    lng: 8.5417,
  });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countrySelectRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const mapContainerStyle = {
    width: '305px',
    height: '305px',
    borderRadius: '4px',
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countrySelectRef.current &&
        !countrySelectRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set translated values after component mounts
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      description: t('venue-description'),
      country: t('country-name'),
      city: t('city-name'),
      streetAddress: t('street-address'),
    }));
  }, [t]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleLogoChange = (e: {
    target: { files: (Blob | MediaSource)[] };
  }) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCountrySelect = (country: string) => {
    setInput((prev) => ({ ...prev, country }));
    setIsCountryDropdownOpen(false);
  };

  const renderMap = () => {
    if (!isLoaded) return <MapSkeleton />;

    const customIcon = {
      url: customMarkerIcon,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={20}
      >
        <Marker
          position={mapCenter}
          icon={customIcon}
          title='Your Venue Location'
        />
      </GoogleMap>
    );
  };



  return (
    <div className='general-container'>
      <div className='about-section'>
        <h2 className='title'>{t('about')}</h2>
        <p className='description'>{t('tell-us-about-you')}</p>
        <div className='file-upload mb-4 flex items-center'>
          <div className='logo-display'>
            <Image
              src='/images/logo/Logo.svg'
              alt={t('logo')}
              width={48}
              height={48}
              className='logo-image'
            />
          </div>

          <label className='logo-upload-label'>
            <Image
              src={logo}
              alt={t('logo')}
              width={14}
              height={14}
              className='logo-image'
            />
            <p className='logo-text'>{t('change-logo')}</p>
          </label>
        </div>
      </div>

      <div className='input-group'>
        <div className='input-field-container'>
          <input
            name='companyName'
            onChange={handleInputChange}
            type='text'
            className='input-field'
            placeholder=' '
            value={input.companyName}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
          />
          <label className='input-label'>{t('company-name')}</label>
        </div>

        <div className='input-field-container'>
          <input
            name='nameOfYourVenue'
            onChange={handleInputChange}
            type='text'
            placeholder=' '
            className='input-field'
            disabled
            value={input.nameOfYourVenue}
          />
          <label className='input-label'>{t('venue-name')}</label>
        </div>

        <div className='input-field-container'>
          <textarea
            id="autoTextarea"
            name='description'
            onChange={handleInputChange}
            placeholder=' '
            className='input-field '
            disabled
            value={input.description}
          />
          <label className='input-label'>{t('describe-venue')}</label>
        </div>
      </div>

      <div className='photos-section'>
        <h2 className='title'>{t('photos')}</h2>
        <p className='description'>{t('photos-description')}</p>
        <div className='photos-grid'>
          {pictureList.map((picture, index) => (
            <div key={index} className='photo-container'>
              {index < 3 && <ThreeDotsMenu />}
              {picture.isCover && (
                <div className='cover-photo-badge'>
                  <Image
                    src='/images/icons/Photograph.svg'
                    alt='cover'
                    width={16}
                    height={16}
                  />
                  <span>Cover Photo</span>
                </div>
              )}
              <Image
                src={picture.src}
                alt={picture.alt}
                width={348}
                height={205}
                className='venue-photo'
                objectFit='cover'
              />
            </div>
          ))}
          <label className='add-more-box'>
            <input
              type='file'
              className='file-input'
              accept='image/*'
              multiple
              onChange={(e) => {
                // Handle file upload logic here
              }}
            />
            <div className='add-more-content'>
              <Image
                src='/images/icons/plus.svg'
                alt={t('plus-icon')}
                width={20}
                height={20}
              />
              <span>{t('click-to-add-more')}</span>
            </div>
          </label>
        </div>
      </div>

      <div className='location-section'>
        <h2 className='title'>{t('location')}</h2>
        <p className='description'>{t('location-description')}</p>
        <div className='lg:!hidden'>
          {renderMap()}
        </div>
        <div className='location-grid max-lg:!mt-5'>
          <form className='location-form'>
            <div
              className='input-field-container input-country'
              ref={countrySelectRef}
            >
              <div className='country-select-wrapper'>
                <input
                  name='country'
                  className='input-field'
                  value={input.country}
                  onClick={() =>
                    setIsCountryDropdownOpen(!isCountryDropdownOpen)
                  }
                  readOnly
                  placeholder=' '
                />
                <label className='input-label'>{t('country')}</label>
                {isCountryDropdownOpen && (
                  <div className='country-options'>
                    {countries.map((country) => (
                      <div
                        key={country}
                        className='country-option'
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='input-field-container'>
              <input
                name='city'
                onChange={handleInputChange}
                type='text'
                value={input.city}
                placeholder=' '
                className='input-field'
                disabled
              />
              <label className='input-label'>{t('city')}</label>
            </div>

            <div className='input-field-container'>
              <input
                name='streetAddress'
                onChange={handleInputChange}
                type='text'
                value={input.streetAddress}
                placeholder=' '
                className='input-field'
                disabled
              />
              <label className='input-label'>{t('street-address')}</label>
            </div>

            <div className='input-field-container'>
              <input
                name='AptSuiteEtc'
                onChange={handleInputChange}
                type='text'
                value={input.AptSuiteEtc}
                placeholder=' '
                className='input-field'
                disabled
              />
              <label className='input-label'>{t('apt-suite')}</label>
            </div>

            <div className='input-field-container'>
              <input
                name='zipCode'
                onChange={handleInputChange}
                type='text'
                value={input.zipCode}
                placeholder=' '
                className='input-field'
                disabled
              />
              <label className='input-label'>{t('zip-code')}</label>
            </div>
          </form>
          <div className='max-lg:!hidden'>
            {renderMap()}
          </div>
        </div>
      </div>
    </div>
  );
}
