'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import './Promotions.scss';

export default function Promotions() {
  const t = useTranslations();

  const [promotions, setPromotions] = useState([
    {
      label: t('new-listing-promotion'),
      description: t('first-customers-discount'),
      value: '8',
      percent: '%',
      isChecked: false,
    },
    {
      label: t('group-discounts'),
      description: t('group-booking-discount'),
      value: '2',
      percent: '%',
      isChecked: false,
    },
  ]);

  const handleCheckboxChange = (index: number) => {
    const updatedPromotions = promotions.map((promo, i) =>
      i === index ? { ...promo, isChecked: !promo.isChecked } : promo,
    );
    setPromotions(updatedPromotions);
  };

  const handleValueChange = (index: number, newValue: string) => {
    if (!/^\d*$/.test(newValue)) return;

    const updatedPromotions = promotions.map((promo, i) =>
      i === index ? { ...promo, value: newValue } : promo,
    );
    setPromotions(updatedPromotions);
  };

  return (
    <section className='promotions'>
      <div className='promotions__title'>
        <h2>{t('promotions-title')}</h2>
        <p>{t('promotions-description')}</p>
      </div>
      <div className='promotions__fields'>
        {promotions.map((item, index) => (
          <div className='promotions__field max-lg:!flex-col max-lg:!items-start max-lg:!gap-3' key={index}>
            <div className='promotions__day-container'>
              <input
                className='promotions__checkbox'
                type='checkbox'
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(index)}
                aria-label={t('toggle-promotion', { promotion: item.label })}
              />
              <span className='ml-1'>
                <label className={`promotions__label`}>{item.label}</label>
                <p className='promotions_description'>{item.description}</p>
              </span>
            </div>

            <div className='promotions__time-select max-lg:!w-full'>
              <input
                type='text'
                value={item.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className='promotions__select max-lg:!w-full'
                aria-label={t('discount-percentage')}
                maxLength={2}
              />
              <label className='promotions__text'>{item.percent}</label>
            </div>
            {index < promotions.length - 1 && (
              <hr className='promotions__divider' />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
