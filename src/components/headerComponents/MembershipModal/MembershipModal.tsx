import React from 'react';
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import './MembershipModal.scss';
import Link from 'next/link';
import { GreenTick, RedCross } from '@/icons';
import { useRouter } from 'next/navigation';

interface MembershipModalProps {
  show: boolean;
  onClose: () => void;
  activePlan: 'basic' | 'pro';
  activePlanInterval: string;
  currency: string;
  price: Number;
  changePaymentInterval: (e: string) => void;
  changeActivePlan: (e: 'basic' | 'pro') => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({
  show,
  onClose,
  activePlanInterval,
  currency,
  price,
  changePaymentInterval,
  activePlan,
  changeActivePlan,
}) => {
  const locale = useLocale();
  const router = useRouter();
  const plans = [
    { name: 'Monthly', value: 'monthly' },
    { name: 'Annual (save 15%)', value: 'annual' },
  ];

  const t = useTranslations();
  const navigateToHomePage = () => {
    onClose();
    router.push(`/${locale}/homeSection`);
  };

  const navigateToCheckout = () => {
    onClose();
    router.push(`/${locale}/subscription-checkout`);
  };

  return (
    <Modal
      size='xl'
      show={show}
      onHide={onClose}
      centered
      dialogClassName='membership-modal'
    >
      <Modal.Header closeButton className='title'>
        <Modal.Title className='modal-title'>
          <Image
            priority
            quality={100}
            src='/images/logo/dark.svg'
            width={85}
            height={20}
            alt='logo'
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2 className='title-heading'>
            {t('membership-modal-title-heading')}
          </h2>
          <Link className='pro-link' href={'/'}>
            <div className='pro-link'>{t('membership-modal-pro-link')}</div>
          </Link>
          <Container>
            <Row>
              <Col
                className={`basic-plan plan ${activePlan === 'basic' ? 'active' : ''}`}
                onClick={(e) => changeActivePlan('basic')}
              >
                <h5 className='plan-name'>
                  {t('membership-modal-basic-plan')}
                </h5>
                <div className='plan-price'>
                  {t('membership-modal-free-plan-price')}
                </div>
                <div className='plan-payment-interval'>
                  {t('membership-modal-free-payment-plan-interval')}
                </div>
                <div className='plan-description'>
                  {t('membership-modal-free-plan-description')}
                </div>
                <div className='divider'></div>
                <ul className='benefits'>
                  <li className='included'>
                    <GreenTick />
                    {t('membership-modal-benefit-recommendations')}
                  </li>
                  <li className='included'>
                    <GreenTick />
                    {t('membership-modal-benefit-points-on-bookings')}
                  </li>
                  <li className='not-included'>
                    <RedCross />
                    {t('membership-modal-benefit-exclusive-access')}
                  </li>
                  <li className='not-included'>
                    <RedCross />
                    {t('membership-modal-benefit-discounts')}
                  </li>
                  <li className='not-included'>
                    <RedCross />
                    {t('membership-modal-benefit-priority-bookings')}
                  </li>
                  <li className='not-included'>
                    <RedCross />
                    {t('membership-modal-benefit-digital-content')}
                  </li>
                </ul>

                <Button
                  className='free-plan-button plan-button'
                  onClick={(e) => {
                    navigateToHomePage();
                  }}
                >
                  {t('membership-modal-current-plan-button')}
                </Button>
              </Col>

              <Col
                className={`pro-plan plan ${activePlan === 'pro' ? 'active' : ''}`}
                onClick={(e) => changeActivePlan('pro')}
              >
                <h5 className='plan-name'>{t('membership-modal-pro-plan')}</h5>
                <div className='plan-price'>
                  <div>
                    {currency} {price.toString()}
                  </div>
                  <div className='month'>
                    {t('membership-modal-membership-price-interval')}
                  </div>
                </div>
                <div className='plan-payment-interval'>
                  {t('membership-modal-pro-payment-plan-interval')}
                </div>
                <div className='plan-description'>
                  {t('membership-modal-pro-plan-description')}
                </div>
                <div className='pro-membership-toggle'>
                  <ToggleButtonGroup
                    className='button-group'
                    type='radio'
                    name='membership-options'
                    value={activePlanInterval}
                    onChange={changePaymentInterval}
                  >
                    {plans.map((plan, index) => (
                      <ToggleButton
                        key={index}
                        id={`radio-${index}`}
                        type='radio'
                        variant='secondary'
                        name='radio'
                        value={plan.value}
                        className={`${plan.value} ${plan.value === activePlanInterval ? 'active' : 'inactive'} toggle-button`}
                      >
                        {plan.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </div>
                <div className='divider'></div>
                <ul className='benefits'>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-recommendations')}
                  </li>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-points-on-bookings')}
                  </li>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-exclusive-access')}
                  </li>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-discounts')}
                  </li>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-priority-bookings')}
                  </li>
                  <li className='included'>
                    <GreenTick />

                    {t('membership-modal-benefit-digital-content')}
                  </li>
                </ul>
                <Button
                  className='pro-plan-button plan-button'
                  onClick={(e) => navigateToCheckout()}
                >
                  {t('membership-modal-current-choose-this-plan')}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MembershipModal;
