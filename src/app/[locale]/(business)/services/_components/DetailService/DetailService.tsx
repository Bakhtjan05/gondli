import React, { SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './DetailService.scss';
import { Practitioners } from '../Practitioners/Practitioners';
import Schedules from '../Schedule/Schedules';
import { ExtraOption } from '../ExtraOption/ExtraOption';
import SpotifyBlend from '../SpotifyBlend/SpotifyBlend';
import { GeneralDetails } from '../AddService/AddServiceForm';

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
  const [serviceName, setServiceName] = useState<string>(
    'Gentle Flow Yoga Class',
  );
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
      LastMessage: 'has been updated successfully',
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
      <h2 className='form-title max-lg:!mt-8 max-lg:!text-xl'>{t('serviceDetailTitle')}</h2>
      <p className='form-description max-lg:!text-sm'>
        {t('serviceDescription')} <span className='font-bold'>Gentle Flow Yoga Class</span>
      </p>
      <div>
        <div className='service-name-enter-div'>
          {!serviceName && <div className='left-border'></div>}
          {serviceName && (
            <div className='service-name-label'>{t('serviceName')}</div>
          )}
          <input
            type='text'
            placeholder={t('serviceName')}
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className={`max-lg:!text-sm ${serviceName && 'filled'}`}
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
            <div className='add-service-button'>{t('editService')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ServiceForm;
