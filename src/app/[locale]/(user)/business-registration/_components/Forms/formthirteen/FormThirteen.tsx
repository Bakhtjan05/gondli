import React, { useState } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import './Formthirteen.scss';
import Image from 'next/image';

interface FormThirteenProps {
  formData: {
    additions: string; // Holds the stringified array of selected additions (now includes title and imgSrc)
  };
  handleChange: (name: string, value: string) => void; // Function to update formData
}

export default function FormThirteen({
  formData,
  handleChange,
}: FormThirteenProps) {
  const t = useTranslations();
  const [selectedAddition, setSelectedAddition] = useState<
    { title: string; imgSrc: string }[]
  >([]); // Array of selected additions with title and imgSrc

  // Array of available additions
  const availableAdditions = [
    {
      title: 'Free Parking',
      imgSrc: '/businessregistration/Building_03.svg',
    },
    {
      title: 'Wi-Fi',
      imgSrc: '/businessregistration/Wifi_High.svg',
    },
    {
      title: 'Air-Conditioned Spaces',
      imgSrc: '/businessregistration/wind-03.svg',
    },
    {
      title: 'Hydration Stations',
      imgSrc: '/businessregistration/Water_Drop.svg',
    },
    {
      title: 'Cozy Lounge',
      imgSrc: '/businessregistration/Leaf.svg',
    },
    {
      title: 'Indoor Bar',
      imgSrc: '/businessregistration/Coffee.svg',
    },
    {
      title: 'Pet-Friendly Policy',
      imgSrc: '/businessregistration/pet.svg',
    },
  ];

  const handleAdditionToggle = (addition: {
    title: string;
    imgSrc: string;
  }) => {
    setSelectedAddition((prevSelected) => {
      let updatedSelected;
      if (prevSelected.some((item) => item.title === addition.title)) {
        // If the addition is already selected, remove it
        updatedSelected = prevSelected.filter(
          (item) => item.title !== addition.title,
        );
      } else {
        // If the addition is not selected, add it
        updatedSelected = [...prevSelected, addition];
      }
      // Update formData with stringified selected additions (including imgSrc)
      handleChange('additions', JSON.stringify(updatedSelected));
      return updatedSelected;
    });
  };

  return (
    <div className='form-ten-main'>
      <FormHeader
        title={t('Tell guests about your special additions')}
        desc={t('Select all the amenities available in your venue')}
      />

      <div className='form-ten-box gradient-border glass-border'>
        <div className='available-additions'>
          {availableAdditions.map((addition, index) => (
            <div
              key={index}
              className={`addition-tag glass-border gradient-thirteen-border max-lg:!w-full ${
                selectedAddition.some((item) => item.title === addition.title)
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleAdditionToggle(addition)}
            >
              <div className='thirteen-icon'>
                <Image
                  src={addition.imgSrc}
                  alt={addition.title}
                  width={20}
                  height={20}
                />
                <div className='thirteen-title max-lg:text-sm'>{t(addition.title)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add displayName for the component
FormThirteen.displayName = 'FormThirteen'; 
