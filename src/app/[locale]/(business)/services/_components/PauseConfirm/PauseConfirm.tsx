import React from 'react';
import './PauseConfirm.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ServiceModalProps } from '../AddService/AddServiceForm';

const PauseConfirm: React.FC<ServiceModalProps> = ({
  onClose,
  isConfirmationVisible,
  setConfirmMessage,
}) => {
  const t = useTranslations();

  const handlePause = () => { 
    isConfirmationVisible(true);
    setConfirmMessage({
      FirstMessage: 'Serive',
      MiddleMessage: 'Gentle Flow Yoga Class',
      LastMessage: 'been been paused successfully',
    });

    onClose();
  };
  return (
    <div className='pause-container'>
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
      <h2 className='form-title max-lg:!text-xl max-lg:mt-2'>
        {t('confirmPausingService')} {/* Confirm Pausing Service */}
      </h2>
      <p className='form-description max-lg:!text-sm '>
        {t('areYouSurePause')} {/* Are you sure you want to pause */}
        <span>{t('gentleFlowYogaClass')} ?</span> {/* Gentle Flow Yoga Class */}
        {t('pauseDescription')}{' '}
      </p>

      <div></div>

      <div className='pause-group-footer max-lg:!mt-10'>
        <div
          className='discard-button-container-1 cursor-pointer'
          onClick={onClose}
        >
          <div className='discard-button-container'>
            <span className='discard-button max-lg:!text-sm'>{t('discard')}</span>{' '}
            {/* Discard */}
          </div>
        </div>
        <div
          className='pause-service-button-container cursor-pointer'
          onClick={handlePause}
        >
          <span className='pause-service-button max-lg:!text-sm'>{t('pauseService')}</span>{' '}
          {/* Pause Service */}
        </div>
      </div>
    </div>
  );
};

export default PauseConfirm;
