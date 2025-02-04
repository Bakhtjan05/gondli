'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PractitionerCardItem from './PractitionerCardItem';
import './PractitionerCardItem.scss';
import { useTranslations } from 'next-intl';

export const Practitioners: React.FC = () => {
  const [practitioners, setPractitioners] = useState<
    { id: number; isValid: boolean }[]
  >([{ id: 1, isValid: false }]);
  const t = useTranslations();

  const addPractitioner = () => {
    setPractitioners((prev) => [
      ...prev,
      { id: prev.length + 1, isValid: false },
    ]);
  };

  const removePractitioner = (id: number) => {
    setPractitioners((prev) =>
      prev.filter((practitioner) => practitioner.id !== id),
    );
  };

  const updateNameValidity = (id: number, isValid: boolean) => {
    setPractitioners((prev) =>
      prev.map((practitioner) =>
        practitioner.id === id ? { ...practitioner, isValid } : practitioner,
      ),
    );
  };

  const isAddDisabled = practitioners.some((p) => !p.isValid);

  return (
    <div className='practitioner_container'>
      {practitioners.map((practitioner) => (
        <PractitionerCardItem
          key={practitioner.id}
          onRemove={() => removePractitioner(practitioner.id)}
          onNameChange={(isValid) =>
            updateNameValidity(practitioner.id, isValid)
          }
        />
      ))}
      <div
        className={`footer-container add-more ${isAddDisabled ? 'disabled' : 'enabled'}`}
        onClick={!isAddDisabled ? addPractitioner : undefined}
        style={{ pointerEvents: isAddDisabled ? 'none' : 'auto' }}
      >
        <Image
          src={'/images/services/plus2.svg'}
          width={12}
          height={12}
          alt='plus icon'
        />
        <p className='max-lg:!text-sm'>{t('Add More Practitioner')}</p>
      </div>
    </div>
  );
};
