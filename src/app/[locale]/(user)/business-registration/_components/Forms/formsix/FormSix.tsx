'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import './Formsix.scss';
import { useTranslations } from 'next-intl';

// Define the props interface for FormSix
interface FormSixProps {
  formData: {
    country: string;
    city: string;
    streetAddress: string;
    suite: string;
    zipCode: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const FormSix: React.FC<FormSixProps> = memo(({ formData, handleChange }) => {
  const t = useTranslations();
  const [countries, setCountries] = useState<string[]>([]);

  // Fetch countries only once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map(
          (country: { name: { common: string } }) => country.name.common,
        );
        setCountries(countryNames.sort()); // Sort countries alphabetically
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className='form-six-main'>
      <FormHeader
        title={t('Is this address correct?')}
        desc={t('Double check the information provided in the last step')}
      />

      <div className='form-six-box gradient-border glass-border'>
        <div className='six-opt gradient-six-border glass-border'>
          <label htmlFor='country' className='six-label'>
            {t('Country')}
          </label>
          <select
            name='country'
            id='country'
            value={formData.country}
            onChange={handleChange}
            className='six-input'
            required
          >
            <option  value=''>{t('Select the country')}</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className='six gradient-six-border glass-border'>
          <label htmlFor='city' className='six-label'>
            {t('City')}
          </label>
          <input
            type='text'
            name='city'
            id='city'
            value={formData.city}
            onChange={handleChange}
            placeholder={t('City')}
            className='six-input'
            required
          />
        </div>

        <div className='six gradient-six-border glass-border'>
          <label htmlFor='street-address' className='six-label'>
            {t('Street Address')}
          </label>
          <input
            type='text'
            name='streetAddress'
            id='street-address'
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder={t('Street Address')}
            className='six-input'
            required
          />
        </div>

        <div className='six gradient-six-border glass-border'>
          <label htmlFor='suite' className='six-label'>
            {t('suite')}
          </label>
          <input
            type='text'
            name='suite'
            id='suite'
            value={formData.suite}
            onChange={handleChange}
            placeholder={t('suite')}
            className='six-input'
            required
          />
        </div>

        <div className='six-last gradient-six-border glass-border'>
          <label htmlFor='zipCode' className='six-label'>
            {t('Zip Code')}
          </label>
          <input
            type='text'
            name='zipCode'
            id='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
            placeholder={t('Zip Code')}
            className='six-input'
            required
          />
        </div>
      </div>
    </div>
  );
});

// Add displayName for the component
FormSix.displayName = 'FormSix'; 

export default FormSix;
