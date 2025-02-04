'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import './InstantBooking.scss';

export default function InstantBooking() {
  const t = useTranslations();
  const [toggle, setToggle] = useState(true);

  return (
    <div className='instant'>
      <div className='instant__title'>
        <div className='flex justify-between'>
          <h2>{t('instant-booking-title')}</h2>
          <div className='instant__toggle'>
            <div
              className={`toggle-switch ${toggle ? 'active' : ''}`}
              onClick={() => setToggle(!toggle)}
              role="switch"
              aria-checked={toggle}
              aria-label={t('toggle-instant-booking')}
            >
              <div className={`toggle-handle ${toggle ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>
        <p className='mt-2'>{t('instant-booking-description')}</p>
      </div>

    </div>
  );
}
