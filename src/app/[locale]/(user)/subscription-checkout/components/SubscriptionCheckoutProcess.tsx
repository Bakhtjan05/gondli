'use client';
import { useTranslations } from 'next-intl';
import './SubscriptionCheckoutProcess.scss';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import {
  ProIcon,
  SubscriptionLogo,
  Tag,
  CreditCard,
  SubscriptionCardCornerCheck,
  SubscriptionCardCornerCircle,
} from '@/icons';
import Select from 'react-select';
import {
  CustomSelectOption,
  CustomSelectValue,
} from './CustomSelectComponents';
import Link from 'next/link';
import PaymentModal from './PaymentModal';

export default function SubscriptionCheckoutProcess() {
  const t = useTranslations();
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedDiscount, setSelectedDiscount] =
    useState<string>('promo-code');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const yearlyPlanPrice = 348;
  const monthlyPlanPrice = 29;
  const currency = 'CHF';
  const discountPercentage = 15;
  const discountAmount = yearlyPlanPrice * (discountPercentage / 100);

  const yearlyPriceWithDiscount =
    yearlyPlanPrice - yearlyPlanPrice * (discountPercentage / 100);

  const discountOptions = [
    {
      value: 'promo-code',
      label: t('subscription-discount-promo-code'),
      icon: <Tag />,
    },
  ];
  const paymentOptions = [
    {
      value: 'card',
      label: t('subscription-credit-card'),
      icon: <CreditCard />,
    },
  ];

  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(true);
  };
  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };
  return (
    <section className='subscription-checkout-page'>
      <div className='container'>
        <div className='header'>
          <h2 className='title'>{t('subscription-checkout-heading')}</h2>
        </div>
      </div>
      <Row className='container'>
        <Col xs={8} className='column'>
          <section className='user-details'>
            <div className='pro-subscription-detail'>
              <div className='logo-container'>
                <SubscriptionLogo />
              </div>
              <div className='plan-details'>
                <div className='extra-info'>
                  <p className='main-text'>
                    {t('subscription-pro-subscription')}
                  </p>
                  <p className='additional-text'>
                    {t('subscription-pro-subscription-bottom-text')}
                  </p>
                </div>
                <ProIcon />
              </div>
            </div>
            <div className='divider'></div>
            <section className='plan-selection subscription-section'>
              <h4 className='subscription-title'>
                {t('subscription-payment-title')}
              </h4>

              <div
                className={`plan-selection ${planType === 'monthly' ? 'active' : ''}`}
                onClick={(e) => {
                  setPlanType('monthly');
                }}
              >
                <div className='plan-type'>
                  {t('subscription-monthly-plan')}
                </div>
                <div className='plan-description'>
                  {t('subscription-monthly-plan-additional')}
                </div>

                {planType === 'monthly' ? (
                  <div className='check'>
                    <SubscriptionCardCornerCheck />
                  </div>
                ) : (
                  <div className='circle'>
                    <SubscriptionCardCornerCircle />
                  </div>
                )}
              </div>
              <div
                className={`plan-selection ${planType === 'yearly' ? 'active' : ''}`}
                onClick={(e) => {
                  setPlanType('yearly');
                }}
              >
                <div className='plan-type'>{t('subscription-yearly-plan')}</div>
                <div className='plan-description'>
                  {t('subscription-yearly-plan-additional')}
                </div>
                {planType === 'yearly' ? (
                  <div className='check'>
                    <SubscriptionCardCornerCheck />
                  </div>
                ) : (
                  <div className='circle'>
                    <SubscriptionCardCornerCircle />
                  </div>
                )}
              </div>
            </section>
            <div className='divider'></div>

            <section className='discount-section subscription-section'>
              <div className='subscription-title'>
                {t('subscription-promo-code')}
              </div>
              <Select
                name='discount-dropdown'
                className='dropdown discount-dropdown'
                classNamePrefix={'dropdown'}
                defaultValue={discountOptions[0]}
                options={discountOptions}
                components={{
                  Option: CustomSelectOption,
                  SingleValue: CustomSelectValue,
                  IndicatorSeparator: () => null,
                  Input: () => null,
                }}
                unstyled={true}
                isSearchable={false}
              />

              <InputGroup className='subscription-input-group'>
                <Form.Control
                  className='subscription-input'
                  placeholder={t('subscription-promo-code-input-text')}
                ></Form.Control>{' '}
                <Button
                  className='apply-promo-button'
                  variant='outline-secondary'
                >
                  {' '}
                  {t('subscription-promo-code-apply')}
                </Button>
              </InputGroup>
            </section>
            <div className='divider'></div>
            <section className='payment-information subscription-section'>
              <div className='subscription-title'>
                {t('subscription-pay-with')}
              </div>
              <Select
                name='payment-dropdown'
                className='dropdown payment-dropdown'
                classNamePrefix={'dropdown'}
                defaultValue={paymentOptions[0]}
                options={paymentOptions}
                components={{
                  Option: CustomSelectOption,
                  SingleValue: CustomSelectValue,
                  IndicatorSeparator: () => null,
                  Input: () => null,
                }}
                unstyled={true}
                isSearchable={false}
              />
              <Form.Control
                className='subscription-input'
                placeholder={t('subscription-card-number')}
              ></Form.Control>
              <div className='card-backside-info'>
                <Form.Control
                  className='subscription-input'
                  placeholder={t('subscription-expiration-date')}
                />
                <Form.Control
                  className='subscription-input'
                  placeholder={t('subscription-cvc')}
                />
              </div>
              <Form.Control
                className='subscription-input'
                placeholder={t('subscription-zip-code')}
              />
            </section>
            <div className='save-card-info'>
              <input className='save-card-checkbox' type='checkbox' />
              <div className='save-card-label'>
                {t('subscription-save-card-information')}
              </div>
            </div>
            <div className='divider'></div>
            <div className='cancelation-policy subscription-section'>
              <div className='subscription-title'>
                {t('subscription-cancelation-policy')}
              </div>
              <section className='cancelation-policy-section'>
                <span> {t('subscription-cancelation-policy-p1')}</span>
                <span className='bold'>
                  {' '}
                  {t('subscription-cancelation-policy-p2')}
                </span>
                <span> {t('subscription-cancelation-policy-p3')}</span>
                <span className='bold'>
                  {' '}
                  {t('subscription-cancelation-policy-p4')}
                </span>
                <span> {t('subscription-cancelation-policy-p5')}</span>
                <span className='bold'>
                  {' '}
                  <Link href={'/'}>{t('subscription-learn-more')}</Link>{' '}
                </span>
              </section>
            </div>
          </section>
        </Col>

        <Col className='column'>
          <section className='payment-details'>
            <h6 className='payment-title'>
              {t('subscription-checkout-payment-details-title')}
            </h6>
            <div className='payment-table'>
              <div className='payment-row'>
                <div className='payment-detail'>
                  {t('subscription-checkout-chosen-plan')}
                </div>
                <div className='payment-price'>
                  {t('subscription-checkout-pro-plan')}
                </div>
              </div>
              <div className='payment-row'>
                <div className='payment-detail'>
                  {t('subscription-checkout-subtotal')}
                </div>
                <div className='payment-price'>
                  {planType === 'monthly' ? monthlyPlanPrice : yearlyPlanPrice}{' '}
                  {currency}
                </div>
              </div>
              {planType === 'monthly' ? (
                <></>
              ) : (
                <div className={`payment-row yearly`}>
                  <div className='payment-detail'>
                    {t('subscription-checkout-yearly-discount')}
                  </div>
                  <div className='payment-price'>
                    -{discountAmount.toFixed(0)} {currency}
                  </div>
                </div>
              )}

              <div className='payment-row total'>
                <div className='payment-detail'>
                  {t('subscription-checkout-total')}
                </div>
                <div className='payment-price total'>
                  {planType === 'monthly' ? (
                    <>{monthlyPlanPrice}</>
                  ) : (
                    <>{yearlyPriceWithDiscount.toFixed(2)}</>
                  )}{' '}
                  {currency}
                </div>
              </div>
            </div>
            <Button className='confirm-button' onClick={handlePaymentModalOpen}>
              {t('subscription-checkout-confirm')}
            </Button>
          </section>
        </Col>
      </Row>

      <PaymentModal
        show={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
      />
    </section>
  );
}
