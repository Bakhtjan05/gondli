'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import './Formtwo.scss';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';

interface FormTwoProps {
  formData: {
    logo: File | null;
  };
  handleChange: (e: { target: { name: string; value: File | null } }) => void;
}

const FormTwo: React.FC<FormTwoProps> = ({ handleChange }) => {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      handleChange({ target: { name: 'logo', value: file } });
    }
  };

  return (
    <div className='form-two relative'>
      <div>
        <FormHeader
          title={t('Upload Logo of Your Company')}
          desc={t(
            "Upload logo of your company that will be used for your venue's listing",
          )}
        />

        <div
          className='form-two-box glass-border gradient-border cursor-pointer '
          onClick={handleClick}
        >
          <input
            type='file'
            ref={fileInputRef}
            onChange={onFileChange}
            className='opacity-0'
            accept='image/*'
            required
          />
          <div className='upload'>
            {previewUrl ? (
              <div className='flex flex-col items-center'>
                <Image
                  src={previewUrl}
                  alt='preview'
                  width={130}
                  height={130}
                  className='flex justify-self-center'
                />
                {selectedFile && (
                  <div className='file-feedback mt-3'>
                    <p>
                      {t('Selected file')}: {selectedFile.name}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <Image
                  src='/businessregistration/Photograph.svg'
                  alt='add photo'
                  width={80}
                  height={80}
                  className='flex justify-self-center'
                />
                <p className='upload-drag max-lg:!text-sm'>{t('Drag your photos here')}</p>
              </div>
            )}
          </div>
          <p className='upload-text mb-3 text-center max-lg:!text-sm'>{t('Upload from your device')}</p>
        </div>
      </div>
    </div>
  );
};

export default FormTwo;
