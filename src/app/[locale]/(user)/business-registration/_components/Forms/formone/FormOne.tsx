'use client';

import React from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import './Formone.scss';
import { useTranslations } from 'next-intl';
// Define the props interface for FormOne
interface FormOneProps {
  formData: {
    name: string;
    venue: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormOne: React.FC<FormOneProps> = ({ formData, handleChange }) => {
  const t = useTranslations();
  return (
    <div className='form-main'>
      <FormHeader
        title={t('How do you want to be called?')}
        desc={t(
          "Enter the Company's name and also the name of your venue, which will be the title of the listing",
        )}
      />

      <div className='form-one-box gradient-border glass-border space-y-4 max-lg:!px-4 max-lg:!py-5'>
        <input
          className='form-company-name max-lg:!text-sm'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder={t('Company Name')}
          required
        />
        <input
          className='form-company-venue max-lg:!text-sm'
          type='text'
          name='venue'
          value={formData.venue}
          onChange={handleChange}
          placeholder={t('Name of Your Venue')}
          required
        />
      </div>
    </div>
  );
};

// Add displayName for the component
FormOne.displayName = 'FormOne';

export default FormOne;
