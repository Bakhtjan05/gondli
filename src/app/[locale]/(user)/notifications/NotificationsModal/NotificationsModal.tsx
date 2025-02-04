import React from 'react';
import { Modal } from 'react-bootstrap';
import './NotificationsModal.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface NotificationsModalProps {
  show: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  show,
  onClose,
}) => {
  const t = useTranslations();
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className='notifications-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Image
            priority
            src='/images/logo/dark.svg'
            width={85}
            height={20}
            alt='logo'
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <h2 className='notifications-title'>{t('ambassador-badge')}</h2>
          <p className='notifications-description'>
            {t('been-select')} <b>{t('top-ambasador')}</b> {t('by')}{' '}
            <b>Spavitality Haven.</b> <br />
            {t('show-it')}
          </p>
        </div>
        <div className='badgeBack'>
          <div className='badge'>
            <Image
              priority
              src='/images/notifications/badgeBack.svg'
              width={85}
              height={85}
              alt='Top Ambassador Badge'
            />
          </div>
          <div className='badgeContent'>
            <div className='content'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0'>
                  <Image
                    priority
                    src='/images/home/user.svg'
                    width={40}
                    height={40}
                    alt='Badge'
                  />
                </div>
                <div className='flex-grow-1 ms-2'>
                  <p className='align-items-center flex'>
                    <b>Madelina H.</b>
                    <Image
                      priority
                      className='ms-1'
                      src='/images/notifications/badge.svg'
                      width={17}
                      height={17}
                      alt='Badge'
                    />
                  </p>
                  <p>
                    Visited Spavitality Haven <b>15 times</b>
                  </p>
                </div>
              </div>
              <span>1</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <div className='buttons'>
        <button onClick={onClose}>{t('no-thanks')}</button>
        <button onClick={onClose}>{t('show-off')}</button>
      </div>
    </Modal>
  );
};

export default NotificationsModal;
