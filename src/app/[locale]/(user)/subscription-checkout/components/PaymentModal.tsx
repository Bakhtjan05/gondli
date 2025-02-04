import { PaymentLoader, PaymentSuccessful } from '@/icons';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PaymentModal.scss';
import { useRouter } from 'next/navigation';

interface MembershipModalProps {
  show: boolean;
  onClose: () => void;
}
const PaymentModal: React.FC<MembershipModalProps> = ({ show, onClose }) => {
  const t = useTranslations();
  const [isPaymentProcessing, setIsPaymentProcessing] =
    useState<boolean>(false);
  const router = useRouter();
  const locale = useLocale();

  const title = isPaymentProcessing
    ? 'payment-modal-loading-title'
    : 'payment-modal-complete-title';
  const description = isPaymentProcessing
    ? 'payment-modal-loading-description'
    : 'payment-modal-complete-description';

  const navigateToHomePage = () => {
    onClose();
    router.push(`/${locale}/homeSection`);
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton={isPaymentProcessing ? false : true}>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className='payment-modal'>
          <div className='container'>
            {isPaymentProcessing ? <PaymentLoader /> : <PaymentSuccessful />}
            <h3 className='title'>{t(title)}</h3>
            <p className='description'>{t(description)}</p>
          </div>

          {isPaymentProcessing ? (
            <></>
          ) : (
            <Button className='complete-button' onClick={navigateToHomePage}>
              {t('payment-modal-complete-button')}
            </Button>
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
