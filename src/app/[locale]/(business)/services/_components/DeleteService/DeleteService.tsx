import React from 'react';
import './DeleteService.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ServiceModalProps } from '../AddService/AddServiceForm';

const DeleteService: React.FC<ServiceModalProps> = ({
  onClose,
  isConfirmationVisible,
  setConfirmMessage,
}) => {
  const t = useTranslations();

  const handleDelete = () => {
    onClose();
    isConfirmationVisible(true);
    setConfirmMessage({
      FirstMessage: 'Service',
      MiddleMessage: 'Gentle Flow Yoga Class',
      LastMessage: 'has been deleted successfully',
    });
  };
  return (
    <div className='delete-container'>
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
      <h2 className='form-title max-lg:!text-xl max-lg:mt-2'>{t('confirm-delete-title')}</h2>
      <p className='form-description max-lg:!text-sm'>
        {t('are-you-sure-remove')}{' '}
        <span>Gentle Flow Yoga Class?</span>{' '}
        {t('deleting-service-description')}
      </p>
      <div className='delete-group-footer max-lg:!mt-10'>
        <div
          className='delete-button-container-1 cursor-pointer'
          onClick={onClose}
        >
          <div className='discard-button-container'>
            <span className='discard-button max-lg:!text-sm'>{t('discard')}</span>
          </div>
        </div>
        <div
          className='delete-button-container cursor-pointer'
          onClick={handleDelete}
        >
          <span className='delete-button max-lg:!text-sm'>{t('delete-service')}</span>
        </div>
      </div>
    </div>
  );
};

export default DeleteService;
