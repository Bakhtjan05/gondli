'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './ScheduleCardItem.scss';
import { useTranslations } from 'next-intl';
interface ScheduleComponentProps {
  day: string;
}
const ScheduleComponent: React.FC<ScheduleComponentProps> = ({ day }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState<any>();
  const [selectedPractitioner, setSelectedPractitioner] = useState<any>( );
  const t = useTranslations();
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isPractitionerDropdownOpen, setIsPractitionerDropdownOpen] =
    useState(false);
  const toggleSelection = () => setIsSelected(!isSelected);
  const toggleTimeDropdown = () => {
    if (!isTimeDropdownOpen && isPractitionerDropdownOpen) {
      setIsPractitionerDropdownOpen(false);
    }
    setIsTimeDropdownOpen(!isTimeDropdownOpen);
  };

  const togglePractitionerDropdown = () => {
    if (!isPractitionerDropdownOpen && isTimeDropdownOpen) {
      setIsTimeDropdownOpen(false);
    }
    setIsPractitionerDropdownOpen(!isPractitionerDropdownOpen);
  };
  const times = [
    '08:00 AM - 09:00 AM',
    '10:00 AM - 11:00 AM',
    '02:00 PM - 03:00 PM',
  ];

  const practitioners = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee'];
  return (
    <div className='schedule-container'>
      <div className='schedule-component max-lg:!flex-col max-lg:!items-start max-lg:!px-0'>
        <div className='day-checkbox' onClick={toggleSelection}>
          <input type='checkbox' checked={isSelected} readOnly />
          <span className={isSelected ? 'selected-text' : 'unselected-text'}>
            {t(day)}
          </span>
        </div>
        <div className='dropdown-container max-lg:!w-full'>
          <div className='dropdown max-lg:!flex-1 max-lg:!w-full'>
            <button
              className={`dropdown-button max-lg:!text-start ${isSelected ? 'enabled' : 'disabled'}`}
              onClick={toggleTimeDropdown}
              disabled={!isSelected}
            >
              {selectedTime ? (
                selectedTime
              ) : (
                <>
                  {t('select')} {t('times')}
                </>
              )}
              <Image
                src='/images/services/downArrow.svg'
                width={12}
                height={12}
                alt='down arrow'
              />
            </button>
            {isTimeDropdownOpen && (
              <ul className='dropdown-menu'>
                {times.map((time) => (
                  <li
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setIsTimeDropdownOpen(false);
                    }}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            )}
            {isTimeDropdownOpen && (
              <div>
                <ul className='menu'>
                  {times.map((time) => (
                    <li
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setIsTimeDropdownOpen(false);
                      }}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='dropdown max-lg:!flex-1 max-lg:!w-full'>
            <button
              className={`dropdown-button max-lg:!text-start ${isSelected ? 'enabled' : 'disabled'}`}
              onClick={togglePractitionerDropdown}
              disabled={!isSelected}
            >
              {selectedPractitioner ? (
                selectedPractitioner
              ) : (
                <>
                  {t('select')} {t('practitioners')}
                </>
              )}
              <Image
                src='/images/services/downArrow.svg'
                width={12}
                height={12}
                alt='down arrow'
              />
            </button>
            {isPractitionerDropdownOpen && (
              <div>
                <ul className='menu'>
                  {practitioners.map((practitioner) => (
                    <li
                      key={practitioner}
                      onClick={() => {
                        setSelectedPractitioner(practitioner);
                        setIsPractitionerDropdownOpen(false);
                      }}
                    >
                      {practitioner}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScheduleComponent;
