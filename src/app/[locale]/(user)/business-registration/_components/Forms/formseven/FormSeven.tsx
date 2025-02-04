'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import './Formseven.scss';
import { useTranslations } from 'next-intl';

interface FormSevenProps {
  formData: {
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSeven: React.FC<FormSevenProps> = ({ formData, handleChange }) => {
  const t = useTranslations();

  const [time, setTime] = useState(formData.time);

  const dayData = [
    { day: 'monday' },
    { day: 'tuesday' },
    { day: 'wednesday' },
    { day: 'thursday' },
    { day: 'friday' },
    { day: 'saturday' },
  ]

  const handleTimeChange = (value: string) => {
    setTime(value);
    handleChange({
      target: { name: 'time', value: time },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (

    <div className='form-seven-main'>
      <FormHeader
        title={t('Working Days & Hours')}
        desc={t('Select your working days and hours')}
      />

      <div className='form-seven-box glass-border gradient-border'>


        {dayData.map((item, index) => (
          <div className='seven' key={index}>
            <div className='days-box wrapper'>
              <input type='checkbox' className='checkbox' id='check' onClick={() => handleTimeChange(item.day)}/>
              <label htmlFor='check' className='days'>
                {t(item.day)}
              </label>
            </div>

            <div className='time-box'>
              <div className='time'> 00:00 </div>
              <div className='time'> 00:00</div>
            </div>
          </div>
        ))}

        <div className='seven-last'>
          <div className='days-box wrapper'>
            <input type='checkbox' className='checkbox' id='sunday' disabled />
            <label htmlFor='sunday' className='days'>
              {t('sunday')}
            </label>
          </div>

          <div className='time-box'>
            <div className='time'> 00:00 </div>
            <div className='time'> 00:00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add displayName for the component
FormSeven.displayName = 'FormSeven';

export default FormSeven;
