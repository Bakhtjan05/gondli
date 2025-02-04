'use client';
import React, { useState } from 'react';
import './Formfive.scss';
import FormHeader from '../../FormHeader/FormHeader';

import Image from 'next/image';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useTranslations } from 'next-intl';

interface FormFiveProps {
  formData: {
    address: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFive: React.FC<FormFiveProps> = ({ formData, handleChange }) => {
  const t = useTranslations();
  const [address, setAddress] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAddress(input);

    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');

      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      );

      if (!response.ok) throw new Error('Failed to fetch place details');

      const data = await response.json();
      const location = data.result.geometry.location;

      setSelectedLocation({ lat: location.lat, lng: location.lng });
      setAddress(data.result.formatted_address);
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div className="form-five relative">
      <div>
        <FormHeader
          title={t("Where's your place located?")}
          desc={t('Make sure to put the pin on the correct spot')}
        />
        <div className="form-five-box glass-border gradient-border max-lg:!px-4 max-lg:!py-5">
          <div>
            <div className="headerInput">
              <Image
                priority
                width={24}
                height={24}
                src="/images/home/SearchOutline.svg"
                alt="SearchOutline"
              />
              <input
                spellCheck="false"
                value={address}
                onChange={handleAddressChange}
                type="text"
                placeholder={t('Enter your address')}
                className="mx-2 search-input max-lg:!ml-0 focus:!bg-none "
              />
              <button className='search-form-btn'>
                <Image src={"/images/icons/search-icon.svg"} alt='' width={20} height={20}/>
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSelectSuggestion(suggestion.place_id)}
                    className="suggestion-item"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="map-container">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
              <GoogleMap
                center={selectedLocation || { lat: 37.7749, lng: -122.4194 }}
                zoom={selectedLocation ? 15 : 10}
                mapContainerStyle={{
                  height: '85%',
                  width: '100%',
                  borderRadius: '12px',
                }}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

FormFive.displayName = 'FormFive';

export default FormFive;
