import React, { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './ActionButtons.scss'; // Import the SCSS file

interface ActionButtonsProps {
  isAddServiceModalOpen: boolean;
  setIsAddServiceModalOpen: Dispatch<SetStateAction<boolean>>;
  searchTerm: any;
  setSearchTerm: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isAddServiceModalOpen,
  setIsAddServiceModalOpen,
  searchTerm,
  setSearchTerm,
}) => {
  const t = useTranslations();

  // Handle search term change on Enter key press or onBlur
  const handleSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter') {
      setSearchTerm((e.target as HTMLInputElement).value);
    }
    if (e.type === 'blur') {
      setSearchTerm((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className='action-buttons max-lg:!flex-col max-lg:!items-start max-lg:gap-2'>
      <p className='title '>{t('services')}</p>
      <div className='button-group max-lg:w-full'>
        <div className='filter-search-wrapper'>
          <button className='button-wrapper-1'>
            <Image
              src={'/images/services/filter.svg'}
              width={14}
              height={14}
              alt='filter'
              className='filter-icon'
            />
            <div className='button-text'>{t('filter')}</div>
          </button>

          <div className='search-field'>
            <div className='search-input'>
              <input
                placeholder={t('Search')}
                type='text'
                className=''
                onBlur={handleSearch} // Handle blur event
                onKeyDown={handleSearch} // Handle Enter key press
              />
            </div>
            <div className='search-btn'>
              <Image
                src={'/images/services/search.svg'}
                width={14}
                height={14}
                alt='search'
                className='search-icon'
                onClick={() => setSearchTerm(searchTerm)} // Keep search on click
              />
            </div>
          </div>
        </div>
        <div className='divider'></div>
        <div className='add-service-wrapper max-lg:flex-1 '>
          <button
            className='button-wrapper-2 max-lg:w-full max-lg:!flex max-lg:!justify-center'
            onClick={() => setIsAddServiceModalOpen(true)}
          >
            <Image
              src={'/images/services/plus.svg'}
              width={16}
              height={16}
              alt='add service'
              className='add-icon'
            />
            <div className='button-text'>{t('add-service')}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
