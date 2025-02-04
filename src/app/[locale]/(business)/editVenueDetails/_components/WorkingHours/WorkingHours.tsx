'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import './WorkingHours.scss';

export default function WorkingHours() {
  const t = useTranslations();

  const formatTime = (time: string): string => {
    if (!time) return '00:00';
    const [hours, minutes] = time.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes ? minutes.padStart(2, '0') : '00';
    return `${formattedHours}:${formattedMinutes}`;
  };

  const [workingHours, setWorkingHours] = useState([
    {
      day: t('monday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('18:00'),
      isChecked: false,
    },
    {
      day: t('tuesday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('18:00'),
      isChecked: false,
    },
    {
      day: t('wednesday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('18:00'),
      isChecked: false,
    },
    {
      day: t('thursday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('18:00'),
      isChecked: false,
    },
    {
      day: t('friday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('18:00'),
      isChecked: false,
    },
    {
      day: t('saturday'),
      startTime: formatTime('08:00'),
      endTime: formatTime('14:00'),
      isChecked: false,
    },
    {
      day: t('sunday'),
      startTime: formatTime('00:00'),
      endTime: formatTime('00:00'),
      isChecked: false,
    },
  ]);

  const handleCheckboxChange = (index: number) => {
    const newHours = [...workingHours];
    newHours[index].isChecked = !newHours[index].isChecked;
    setWorkingHours(newHours);
  };

  const handleTimeChange = (
    index: number,
    timeType: 'startTime' | 'endTime',
    value: string,
  ) => {
    const newHours = [...workingHours];
    newHours[index][timeType] = formatTime(value);
    setWorkingHours(newHours);
  };

  return (
    <section className='workingHours'>
      <div className='workingHours__title'>
        <h2>{t('working-hours-title')}</h2>
        <p>{t('working-hours-description')}</p>
      </div>
      <div className='workingHours__fields'>
        {workingHours.map((item, index) => (
          <div className='workingHours__field' key={index}>
            <div className='workingHours__day-container'>
              <input
                className='workingHours__checkbox'
                type='checkbox'
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(index)}
                aria-label={t('toggle-working-hours', { day: item.day })}
              />
              <label
                className={`workingHours__day ${!item.isChecked ? 'disabled' : ''}`}
              >
                {item.day}
              </label>
            </div>

            <div className='workingHours__time-select'>
              <input
                onChange={(e) =>
                  handleTimeChange(index, 'startTime', e.target.value)
                }
                className={`availability__select ${!item.isChecked ? 'disabled' : ''}`}
                disabled={!item.isChecked}
                type='time'
                value={item.startTime}
                aria-label={t('start-time')}
              />
              <input
                onChange={(e) =>
                  handleTimeChange(index, 'endTime', e.target.value)
                }
                className={`availability__select ${!item.isChecked ? 'disabled' : ''}`}
                disabled={!item.isChecked}
                type='time'
                value={item.endTime}
                aria-label={t('end-time')}
              />
            </div>
            {index !== workingHours.length - 1 && (
              <hr className='workingHours__divider' />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
