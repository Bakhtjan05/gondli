import React from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import './Formthree.scss';
import { useTranslations } from 'next-intl';

// Define the props interface for FormThree
interface FormThreeProps {
  formData: {
    description: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormThree: React.FC<FormThreeProps> = ({ formData, handleChange }) => {
  const t = useTranslations();
  return (
    <div className='form-description'>
      <FormHeader
        title={t("Now let's describe your venue")}
        desc={t(
          'Give us a brief introduction of your venue, let the users know who you are and what you offer to them',
        )}
      />

      <textarea
        className='form-description-text max-lg:!text-sm'
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder={t('Description')}
        required
      />
    </div>
  );
};

// Add displayName for the component
FormThree.displayName = 'FormThree'; 

export default FormThree;
