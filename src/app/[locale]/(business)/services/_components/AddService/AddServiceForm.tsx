// ServiceForm.tsx
import React, { SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './AddServiceForm.scss';
import { Practitioners } from '../Practitioners/Practitioners';
import Schedules from '../Schedule/Schedules';
import { ExtraOption } from '../ExtraOption/ExtraOption';
import SpotifyBlend from '../SpotifyBlend/SpotifyBlend';

export interface ServiceModalProps {
  onClose: () => void;
  isConfirmationVisible: React.Dispatch<SetStateAction<boolean>>;
  setConfirmMessage: React.Dispatch<
    SetStateAction<{
      FirstMessage: string;
      MiddleMessage: string;
      LastMessage: string;
    }>
  >;
}

const ServiceForm: React.FC<ServiceModalProps> = ({
  onClose,
  isConfirmationVisible,
  setConfirmMessage,
}) => {
  const [serviceName, setServiceName] = useState<string>('');
  const [selectServices, setSelectServices] = useState<number>(1);
  const t = useTranslations();

  const handleServiceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setServiceName(event.target.value);
  };

  const handleAddServiceSubmit = () => {
    isConfirmationVisible(true);
    setConfirmMessage({
      FirstMessage: 'Service',
      MiddleMessage: 'Gentle Flow Yoga Class',
      LastMessage: 'has been created successfully',
    });
    onClose();
  };

  return (
    <div className='service-form-1'>
      <div className='form-header'>
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
      <h2 className='form-title max-lg:!text-xl max-lg:mt-8 '>{t('add-service')}</h2>
      <p className='form-description max-lg:!text-sm'>{t('add-service-description')}</p>

      <div>
        <div className='service-name-enter-div'>
          {!serviceName && <div className='left-border max-lg:!hidden'></div>}
          {serviceName && (
            <div className='service-name-label'>{t('serviceName')}</div>
          )}
          <input
            type='text'
            placeholder={t('serviceName')}
            onChange={(e) => setServiceName(e.target.value)}
            className={`service-name-input max-lg:!text-sm ${serviceName && 'filled'}`}
          />
        </div>

        <div className='form-container'>
          <div className='header-container overflow-x-auto max-lg:!gap-4'>
            {[
              'generalDetails',
              'practitioners',
              'schedule',
              'extraOptions',
              'spotifyBlend',
            ].map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectServices(index + 1)}
                className={`${
                  selectServices === index + 1
                    ? 'selected-service'
                    : 'non-selected-service'
                } cursor-pointer`}
              >
                <p className='text-center max-lg:text-nowrap'>{t(service)}</p>
              </div>
            ))}
          </div>

          <div className='body-container'>
            {selectServices === 1 && <GeneralDetails />}
            {selectServices === 2 && <Practitioners />}
            {selectServices === 3 && <Schedules />}
            {selectServices === 4 && <ExtraOption />}
            {selectServices === 5 && <SpotifyBlend />}
          </div>
        </div>

        <div className='group-footer'>
          <div
            className='discard-button-container-1 cursor-pointer'
            onClick={onClose}
          >
            <div className='discard-button-container'>
              <div className='discard-button'>{t('discard')}</div>
            </div>
          </div>
          <div
            className='add-service-button-container cursor-pointer'
            onClick={handleAddServiceSubmit}
          >
            <div className='add-service-button'>{t('add-service')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GeneralDetails: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [timeDuration, setTimeDuration] = useState<number>(0);
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const t = useTranslations();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const incrementValueCapacity = (setValue: React.Dispatch<React.SetStateAction<number>>, maxLimit: number) => {
    setValue((prev) => (prev < maxLimit ? prev + 1 : prev));
  };

  const decrementValueCapacity = (setValue: React.Dispatch<React.SetStateAction<number>>, minLimit: number) => {
    setValue((prev) => (prev > minLimit ? prev - 1 : prev));
  };

  const incrementValue = (setValue: React.Dispatch<React.SetStateAction<number>>, maxLimit: number) => {
    setValue((prev) => (prev < maxLimit ? prev + 1 : prev));
  };

  const decrementValue = (setValue: React.Dispatch<React.SetStateAction<number>>, minLimit: number) => {
    setValue((prev) => (prev > minLimit ? prev - 1 : prev));
  };

  return (
    <div className='form-group-1'>
      <div className='service-detail-inputField max-lg:!w-full max-lg:!flex-col max-lg:!items-start max-lg:gap-3 max-lg:mt-2'>
        <label htmlFor='serviceCategory'>{t('serviceCategory')}</label>
        <div className='dropdown max-lg:!flex-1 max-lg:!w-full'>
          <button
            className='add-service-dropdown-toggle-2 max-lg:!w-full'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span
              className={
                selectedCategory ? 'category-selected max-lg:!text-sm' : 'placeholder-text max-lg:!text-sm'
              }
            >
              {selectedCategory || t('select')}
            </span>
            <div className='button-container'>
              <Image
                src='/images/services/downArrow.svg'
                width={12}
                height={12}
                alt='down arrow'
              />
            </div>
          </button>
          {isDropdownOpen && (
            <ul className='dropdown-menu-1 max-lg:!text-sm'>
              <li onClick={() => handleCategorySelect('Yoga')}>{t('yoga')}</li>
              <li onClick={() => handleCategorySelect('Spa')}>{t('spa')}</li>
              <li onClick={() => handleCategorySelect('Fitness')}>
                {t('fitness')}
              </li>
              <li onClick={() => handleCategorySelect('Cycling')}>Cycling</li>
              <li onClick={() => handleCategorySelect('Mindful Cooldown')}>
                Mindful Cooldown
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className='service-detail-inputField max-lg:!w-full max-lg:!flex-col max-lg:!items-start max-lg:gap-3 '>
        <label htmlFor='duration'>{t('session-duration')}</label>
        <div className='dropdown max-lg:!flex-1 max-lg:!w-full'>
          <button className='dropdown-toggle-1 max-lg:!w-full max-lg:!pr-0'>
            <input
              type='number'
              placeholder='0 Min'
              value={timeDuration}
              min={0}
              onChange={(e) =>
                setTimeDuration(Math.max(0, Number(e.target.value)))
              }
            />
            <div className='button-container arthimetic-buttons'>
              <button onClick={() => decrementValue(setTimeDuration, 0)}>
                <Image
                  src={'/images/services/minus.svg'}
                  width={16}
                  height={16}
                  alt='minus arrow'
                  className='minus-btn'
                />
              </button>
              <button onClick={() => incrementValue(setTimeDuration, 300)}>
                <Image
                  src={'/images/services/plus2.svg'}
                  width={16}
                  height={16}
                  alt='plus arrow'
                  className='plus-btn'
                />
              </button>
            </div>
          </button>
        </div>
      </div>

      <div className='service-detail-inputField max-lg:!w-full max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
        <label htmlFor='price'>Service Price</label>
        <div className='dropdown max-lg:!w-full'>
          <button className='dropdown-toggle-1 max-lg:!w-full max-lg:text-sm'>
            <input type='number' placeholder='0' />
            <span className='button-container text-[#000B19]'>{t('chf')}</span>
          </button>
        </div>
      </div>

      <div className='service-detail-inputField gap-3'>
        <div>
          <label htmlFor='groupBooking'>{t('Group Bookings Available')}</label>
          <p className='group-booking-explain'>{t('groupBooking')}</p>
        </div>
        <div
          onClick={() => setToggle(!toggle)}
          className={`toggle-circle-container  ${toggle ? 'toggle-circle-true' : 'toggle-circle-false'}`}
        >
          <Image
            src={'/images/services/toggleCircle.svg'}
            alt='toggle circle'
            width={20}
            height={20}
          />
        </div>
      </div>

      {toggle && (
        <div className='service-detail-inputField max-lg:!w-full max-lg:!flex-col max-lg:!items-start max-lg:gap-3'>
          <label htmlFor='maxCapacity'>{t('group-max-capacity')}</label>
          <div className='dropdown max-lg:!w-full'>
            <button className='dropdown-toggle-1 max-lg:!w-full max-lg:!pr-0'>
              <input
                type='number'
                placeholder='0'
                value={maxCapacity}
                min={0}
                onChange={(e) =>
                  setMaxCapacity(Math.max(0, Number(e.target.value)))
                }
              />
              <span className='button-container arthimetic-buttons'>
                <button onClick={() => decrementValueCapacity(setMaxCapacity, 0)}>
                  <Image
                    src={'/images/services/minus.svg'}
                    width={12}
                    height={12}
                    className='minus-btn'
                    alt='minus arrow'
                  />
                </button>
                <button onClick={() => incrementValueCapacity(setMaxCapacity, 100)}>
                  <Image
                    src={'/images/services/plus2.svg'}
                    width={12}
                    height={12}
                    alt='plus arrow'
                    className='plus-btn'
                  />
                </button>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceForm;
