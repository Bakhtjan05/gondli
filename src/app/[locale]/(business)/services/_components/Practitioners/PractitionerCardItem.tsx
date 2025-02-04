import React, { useState } from 'react';
import './PractitionerCardItem.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface PractitionerCardItemProps {
  onRemove: () => void;
  onNameChange: (isValid: boolean) => void;
}

const PractitionerCardItem: React.FC<PractitionerCardItemProps> = ({
  onRemove,
  onNameChange,
}) => {
  const t = useTranslations();
  const [name, setName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value; // Remove trim here
    setName(inputValue);
    onNameChange(!!inputValue.trim()); // Use trimmed value only for validation
  };

  return (
    <div className='container max-lg:!flex-col'>
      <button
        className='remove-btn'
        onClick={onRemove}
        aria-label='Remove Practitioner'
      >
        &times;
      </button>
      <div className='avatar-text-container max-lg:pb-2 max-lg:border-b max-lg:border-b-[#DBECF0]'>
        <div className='avatar max-lg:!ml-2'>
          <Image src='/images/services/avatar.svg' alt='avatar' width={16} height={16}/>
        </div>
        <input
          value={name}
          onChange={handleNameChange}
          placeholder={`${t('Practitioners Full Name')}`}
        />
      </div>
      <div className='custom-upload max-lg:!mt-3'>
        <label htmlFor='fileUpload' className='upload-label'>
          <span className='custom-underline'>⬆</span>
          <span className='max-lg:!text-sm'>{t('Upload Picture')}</span>
        </label>
        <input type='file' id='fileUpload' className='file-input' />
      </div>
    </div>
  );
};

export default PractitionerCardItem;
