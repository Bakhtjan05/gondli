'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import './CancelationPolicy.scss';

export default function CancelationPolicy() {
  const t = useTranslations();
  const [selectedPolicy, setSelectedPolicy] = useState<string>('');

  const policies = [
    {
      label: t('flexible-policy'),
      description: t('flexible-description'),
    },
    {
      label: t('moderate-policy'),
      description: t('moderate-description'),
    },
    {
      label: t('firm-policy'),
      description: t('firm-description'),
    },
    {
      label: t('strict-policy'),
      description: t('strict-description'),
    },
  ];

  return (
    <section className='cancelation'>
      {policies.map((item, index) => (
        <div key={index} className='cancelation__item'>
          <div className='cancelation__field'>
            <input
              className='cancelation__input'
              type='radio'
              name='cancellationPolicy'
              value={item.label}
              checked={selectedPolicy === item.label}
              onChange={(e) => setSelectedPolicy(e.target.value)}
              aria-label={t('select-policy', { policy: item.label })}
            />
            <div className='cancelation__text'>
              <label className='cancelation__label'>{item.label}</label>
              <p className='cancelation__description'>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
