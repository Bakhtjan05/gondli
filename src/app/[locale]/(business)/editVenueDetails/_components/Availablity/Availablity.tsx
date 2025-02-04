'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import './Availability.scss';

export default function Availability() {
  const t = useTranslations();

  const options = {
    'advance-notice': [
      t('same-day'),
      t('one-day'),
      t('two-days'),
      t('three-days'),
    ],
    'same-day-notice': [t('9am'), t('10am'), t('11am'), t('12pm')],
    'preparation-time': [t('none'), t('30-minutes'), t('1-hour'), t('2-hours')],
    'availability-window': [
      t('12-months'),
      t('6-months'),
      t('3-months'),
      t('1-month'),
    ],
  };

  const availabilityFields = [
    {
      label: t('advance-notice-label'),
      description: t('advance-notice-description'),
      value: t('same-day'),
      optionsKey: 'advance-notice',
    },
    {
      label: t('same-day-notice-label'),
      description: t('same-day-notice-description'),
      value: t('9am'),
      optionsKey: 'same-day-notice',
    },
    {
      label: t('preparation-time-label'),
      description: t('preparation-time-description'),
      value: t('none'),
      optionsKey: 'preparation-time',
    },
    {
      label: t('availability-window-label'),
      description: t('availability-window-description'),
      value: t('12-months'),
      optionsKey: 'availability-window',
    },
  ];

  return (
    <section className='availability'>
      {availabilityFields.map((item, index) => (
        <div key={index} className='availability__field max-lg:!flex-col max-lg:!items-start max-lg:!gap-4'>
          <div className='availability_text'>
            <label className='availability__label'>{item.label}</label>
            <p className='availability__description'>{item.description}</p>
          </div>

          <div className='availability__time-select max-lg:!w-full'>
            <div className='select-wrapper max-lg:!w-full'>
              <select
                className='availability__select'
                aria-label={t('select-availability', { field: item.label })}
              >
                {options[item.optionsKey as keyof typeof options]?.map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ),
                )}
              </select>
              <div className='select-arrow'></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
