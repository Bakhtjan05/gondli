'use client';

import React, { useEffect, useState, useCallback, memo } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import './Formfourteen.scss';
import { useTranslations } from 'next-intl';

interface FormFifteenProps {
  formData: {
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFifteen: React.FC<FormFifteenProps> = ({
  formData,
  handleChange,
}) => {
  const t = useTranslations();

  const [time, setTime] = useState(formData.time);

  const handleTimeChange = (value: string) => {
    setTime(value);
    handleChange({
      target: { name: 'time', value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className='form-fifteen-main'>
      <FormHeader
        title={t('Add Discounts')}
        desc={t(
          'This is an optional step, but important to consider while trying to get your first customer',
        )}
      />

      <div className='form-fifteen-box glass-border gradient-border'>
        <div className='fifteen max-lg:!mx-4 max-lg:!flex-col max-lg:!items-start max-lg:!pb-3'>
          <div className='days-box'>
            <input type='checkbox' className='checkbox min-w-5' id='opt1' />

            <label htmlFor='opt1' className='days'>
              <div className='fifteen-main max-lg:!my-3'>
                <p className='fifteen-text max-lg:!text-sm'>{t('New Listing Promotion')}</p>
                <p className='fifteen-desc'>
                  {t('Offer discount to your first 3 customers')}
                </p>
              </div>
            </label>
          </div>

          <div className='time-box max-lg:!w-full'>
            <div className='fifteen-time times glass-border gradient-fifteen-border max-lg:!w-full'>
              <input type="text" className='time-input z-20 !w-[69px] h-full max-lg:!w-full' placeholder='0'/>
              <span className='percentage'>%</span>
            </div>
          </div>
        </div>
        <div className='fifteen-last max-lg:!px-4 max-lg:!flex-col max-lg:!items-start max-lg:!pb-3'>
          <div className='days-box'>
            <input type='checkbox' className='checkbox min-w-5' id='opt2' />

            <label htmlFor='opt2' className='days'>
              <div className='fifteen-main max-lg:!mb-3'>
                <p className='fifteen-text max-lg:!text-sm'>{t('Group Discounts')}</p>
                <p className='fifteen-desc'>
                  {t('Offer discount if customers book for at least 3 persons')}
                </p>
              </div>
            </label>
          </div>

          <div className='time-box max-lg:!w-full'>
            <div className='fifteen-time times glass-border gradient-fifteen-border max-lg:!w-full'>
            <input type="text" className='time-input z-20 !w-[69px] h-full max-lg:!w-full' placeholder='0'/>
            <span className='percentage'>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add displayName for the component
FormFifteen.displayName = 'FormFifteen'; 

export default FormFifteen;
