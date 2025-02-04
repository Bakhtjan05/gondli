import React, { useState } from 'react';
import './Discount.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ServiceModalProps } from '../AddService/AddServiceForm';

const DiscountsModal: React.FC<ServiceModalProps> = ({
  onClose,
  isConfirmationVisible,
  setConfirmMessage,
}) => {
  const [discountPercentage, setDiscountPercentage] = useState<any>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownStartingDate, setIsDropdownStartingDate] = useState(false);
  const [isDropdownEndingDate, setIsDropdownEndingDate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStartingCategory, setSelectedStartingCategory] = useState('');
  const [selectedEndingCategory, setSelectedEndingCategory] = useState('');
  const t = useTranslations();

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountPercentage(Number(event.target.value));
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleStartingDateSelect = (category: string) => {
    setSelectedStartingCategory(category);
    setIsDropdownStartingDate(false);
  };

  const handleEndingDateSelect = (category: string) => {
    setSelectedEndingCategory(category);
    setIsDropdownEndingDate(false);
  };

  const handleDiscountSubmit = () => {
    isConfirmationVisible(true);
    setConfirmMessage({
      FirstMessage: 'Discount for Service',
      MiddleMessage: 'Gentle Flow Yoga Class',
      LastMessage: 'has been successfully set-up',
    });

    onClose();
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Discount:', discountPercentage);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div className='discount-block'>
      <div className='form-header max-lg:!py-0'>
        <Image
          src='/images/services/logoName.svg'
          width={82.78}
          height={16.8}
          alt='logo'
        />
        <Image
          src='/images/services/closeIcon.svg'
          width={20}
          height={20}
          alt='close'
          onClick={onClose}
          className='cursor-pointer'
        />
      </div>
      <h2 className='form-title max-lg:!text-xl'>
        {t('setDiscounts')} {/* Set Discounts */}
      </h2>
      <p className='discount-form-description max-lg:!text-sm'>{t('discountDescription')}</p>{' '}
      {/* Running a sale can help you attract more customers... */}
      <div className='discount-header-container'>
        <div>
          <p className='text-center'>{t('discountTerms')}</p>
        </div>{' '}
        {/* Discount Terms */}
      </div>
      <div className='form-container discount-container'>
        <div className='discount-service-category-form max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
          <label className='max-lg:!text-sm' htmlFor='serviceCategory'>{t('discountMethod')}</label>{' '}
          {/* Discount Method */}
          <div className='dropdown max-lg:!w-full'>
            <button
              className='dropdown-toggle-2 max-lg:!w-full'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={selectedCategory ? 'selected' : 'unselected'}>
                {selectedCategory || t('select')}
              </span>
              {/* Select */}
              <div className='right-border' />
              <span className='button-container'>
                <div>
                  <Image
                    src='/images/services/downArrow.svg'
                    width={10}
                    height={10}
                    alt='down arrow'
                  />
                </div>
              </span>
            </button>
            {isDropdownOpen && (
              <ul className='discount-dropdown-menu max-lg:!text-sm'>
                <li onClick={() => handleCategorySelect('Percentage Off')}>
                  Percentage Off
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className='discount-service-category-form max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
          <label className='max-lg:!text-sm' htmlFor='serviceCategory'>{t('discountPercentage')}</label>{' '}
          <div className='dropdown max-lg:!w-full'>
            <button className='dropdown-toggle-2 percentage-div max-lg:!w-full'>
              <input
                className='max-lg:!text-sm'
                type='number'
                placeholder='0'
                value={discountPercentage}
                onChange={handleDiscountChange}
              />
              <div className='right-border' />
              <div className='button-container'>
                <div id='percentage-icon'>%</div>
              </div>
            </button>
          </div>
        </div>

        <div className='discount-service-category-form max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
          <label className='max-lg:!text-sm' htmlFor='serviceCategory'>Sale Starting Date</label>{' '}
          {/* Discount Method */}
          <div className='dropdown max-lg:!w-full'>
            <button
              className='dropdown-toggle-2 max-lg:!w-full'
              onClick={() => setIsDropdownStartingDate(!isDropdownStartingDate)}
            >
              <span className={selectedStartingCategory ? 'selected' : 'unselected'}>
                {selectedStartingCategory || t('select')}
              </span>
              {/* Select */}
              <div className='right-border' />
              <span className='button-container'>
                <div>
                  <Image
                    src='/images/services/downArrow.svg'
                    width={10}
                    height={10}
                    alt='down arrow'
                  />
                </div>
              </span>
            </button>
            {isDropdownStartingDate && (
              <ul className='discount-dropdown-menu max-lg:!text-sm'>
                <li onClick={() => handleStartingDateSelect('Percentage Off')}>
                  Percentage Off
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className='discount-service-category-form max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
          <label className='max-lg:!text-sm' htmlFor='serviceCategory'>Sale Ending Date</label>{' '}
          {/* Discount Method */}
          <div className='dropdown max-lg:!w-full'>
            <button
              className='dropdown-toggle-2 max-lg:!w-full'
              onClick={() => setIsDropdownEndingDate(!isDropdownEndingDate)}
            >
              <span className={selectedEndingCategory ? 'selected' : 'unselected'}>
                {selectedEndingCategory || t('select')}
              </span>
              {/* Select */}
              <div className='right-border' />
              <span className='button-container'>
                <div>
                  <Image
                    src='/images/services/downArrow.svg'
                    width={10}
                    height={10}
                    alt='down arrow'
                  />
                </div>
              </span>
            </button>
            {isDropdownEndingDate && (
              <ul className='discount-dropdown-menu max-lg:!text-sm'>
                <li onClick={() => handleEndingDateSelect('Percentage Off')}>
                  Percentage Off
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='discount-group-footer'>
        <div
          className='discount-button-container-1 cursor-pointer'
          onClick={onClose}
        >
          <div className='discard-button-container'>
            <span className='discard-button'>{t('discard')}</span>{' '}
            {/* Discount */}
          </div>
        </div>
        <div
          className='discount-button-container cursor-pointer'
          onClick={handleDiscountSubmit}
        >
          <span className='add-discount-button'>{t('setDiscount')}</span>{' '}
          {/* Set Discount */}
        </div>
      </div>
    </div>
  );
};

export default DiscountsModal;
