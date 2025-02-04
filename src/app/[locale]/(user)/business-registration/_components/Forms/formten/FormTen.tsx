import React, { useState, useEffect } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import './Formten.scss';

interface FormTenProps {
  formData: {
    services: string; // Holds the stringified array of selected services
  };
  handleChange: (name: string, value: string) => void; // Function to update formData
}

export default function FormTen({ formData, handleChange }: FormTenProps) {
  const t = useTranslations();
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Array of selected services
  const [availableServices, setAvailableServices] = useState<string[]>([
    'Yoga',
    'Fitness',
    'Massage',
    'Sauna',
    'Spa',
    'Reiki',
    'Chiropractic',
    'Pilates',
    'Meditation',
    'Nutrition',
    'Ayurveda',
    'Acupuncture',
    'Aromatherapy',
    'Counseling',
    'Detox',
    'Mindfulness',
    'Retreats',
    'Coaching',
    'Tai Chi',
  ]); // Initial array of available services

  const [customService, setCustomService] = useState(''); // State for new custom service

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(service)) {
        // If the service is already selected, remove it
        return prevSelected.filter((s) => s !== service);
      } else {
        // If the service is not selected, add it
        return [...prevSelected, service];
      }
    });
  };

  const handleAddCustomService = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Отключает только действие для Enter
      if (customService.trim() !== '' && !availableServices.includes(customService)) {
        setAvailableServices((prevServices) => [...prevServices, customService]);
        setSelectedServices((prevSelected) => [...prevSelected, customService]);
      }
      setCustomService(''); // Очистить поле ввода
    }
  };

  // Update formData with stringified selectedServices whenever it changes
  useEffect(() => {
    handleChange('services', JSON.stringify(selectedServices));
  }, [selectedServices]);

  return (
    <div className='form-ten-main'>
      <FormHeader
        title={t('What types of services do you offer to users?')}
        desc={t('Select all the types you offer to your users')}
      />

      <div className='form-ten-box gradient-border glass-border'>
        <div className='available-services'>
          {availableServices.map((service, index) => (
            <span
              key={index}
              className={`service-tag glass-border gradient-border cursor-pointer max-lg:!text-sm ${selectedServices.includes(service) ? 'selected' : ''}`}
              onClick={() => handleServiceToggle(service)}
            >
              {t(service)}
            </span>
          ))}
          <input
            type='text'
            className='custom-service-input max-lg:!text-sm z-20 service-tag glass-border gradient-border !py-2 !
            border-none'
            placeholder={t('Add your own service')}
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
            onKeyDown={handleAddCustomService}
          />
        </div>
      </div>
    </div>
  );
}

// Add displayName for the component
FormTen.displayName = 'FormTen';
