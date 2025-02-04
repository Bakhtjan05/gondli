import React, { useState, ChangeEvent } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import './Formnine.scss';
import Image from 'next/image';

interface Practitioner {
  name: string;
  picture: File | null;
  picturePreview?: string;
}

interface FormNineProps {
  formData: {
    practitioners: Practitioner[];
  };
  handleChange: (name: string, value: Practitioner[]) => void;
}

const FormNine: React.FC<FormNineProps> = ({ formData, handleChange }) => {
  const [practitioners, setPractitioners] = useState<Practitioner[]>([
    { name: '', picture: null, picturePreview: undefined },
  ]);

  const t = useTranslations();

  const handleInputChange = (
    index: number,
    field: keyof Practitioner,
    value: any,
  ) => {
    const updatedPractitioners = practitioners.map((practitioner, i) => {
      if (i === index) {
        // create an object URL for preview
        if (field === 'picture' && value instanceof File) {
          const preview = URL.createObjectURL(value);
          return {
            ...practitioner,
            [field]: value,
            picturePreview: preview,
          };
        }
        return { ...practitioner, [field]: value };
      }
      return practitioner;
    });
    setPractitioners(updatedPractitioners);
    handleChange('practitioners', updatedPractitioners);
  };

  const handleAddPractitioner = () => {
    setPractitioners([
      ...practitioners,
      { name: '', picture: null, picturePreview: undefined },
    ]);
  };

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // cleanup object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      practitioners.forEach((practitioner) => {
        if (practitioner.picturePreview) {
          URL.revokeObjectURL(practitioner.picturePreview);
        }
      });
    };
  }, []);

  return (
    <div className='form-nine-main'>
      <FormHeader
        title={t(
          'Do you want to add a list of your practitioners? (Skippable)',
        )}
        desc={t('Add yoga instructors')}
      />

      <div className='form-nine-box gradient-border glass-border'>
        {practitioners.map((practitioner, index) => (
          <div key={index} className='nine glass-border gradient-nine-border  max-lg:!flex-col'>
            <div className='flex items-center flex-1 max-lg:!w-full max-lg:border-b max-lg:border-b-[#7F9EA5]'>
              <div className='nine-image'>
                <Image
                  src={
                    practitioner.picturePreview ||
                    '/businessregistration/Frame 1000002508.svg'
                  }
                  alt={practitioner.name || 'Practitioner'}
                  height={33}
                  width={33}
                  style={{ objectFit: 'cover', borderRadius: '60px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/businessregistration/Frame 1000002508.svg';
                  }}
                  className='min-h-[33px] min-w-[33px]'
                />
              </div>

              <input
                className='nine-text'
                type='text'
                placeholder={t("Practitioner's Full Name")}
                value={practitioner.name}
                onKeyDown={preventEnterSubmit}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
            </div>

            <button
              type='button'
              onClick={() =>
                document.getElementById(`fileInput-${index}`)?.click()
              }
              className='nine-button z-10'
            >
              <img src='/businessregistration/Upload.svg' alt='' />
              {t('Upload Picture')}
            </button>

            <div className='nine-upload'>
              <input
                className='hidden'
                type='file'
                id={`fileInput-${index}`}
                accept='image/*'
                onChange={(e) =>
                  handleInputChange(
                    index,
                    'picture',
                    e.target.files ? e.target.files[0] : null,
                  )
                }
              />

            </div>
          </div>
        ))}

        <button
          className='nine-add'
          type='button'
          onClick={handleAddPractitioner}
        >
          <Image
            src={'/businessregistration/Plus.svg'}
            alt={'add'}
            width={14}
            height={14}
          />
          {t('Add Practitioner')}
        </button>
      </div>
    </div>
  );
};

FormNine.displayName = 'FormNine';

export default FormNine;
