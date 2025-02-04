'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import './Formfour.scss';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';

// Define the props interface for FormFour
interface FormFourProps {
  onFilesChange: (files: File[]) => void; // Accepts an array of File objects
}

const FormFour: React.FC<FormFourProps> = ({ onFilesChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Type for ref
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // Store file URLs

  const t = useTranslations();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log('File input clicked');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));

      setSelectedFiles((prevFiles) => [...prevFiles, ...newFileUrls]);
      onFilesChange(newFiles);
    }
  };

  return (
    <div className='form-four relative'>
      <div>
        <FormHeader
          title={t('Add some photos of your venue')}
          desc={t(
            'You will need at least 5 photos to get started. you can add more or make changes later ',
          )}
        />
        <div
          onClick={selectedFiles.length === 0 ? handleClick : undefined}
          className='form-four-box glass-border gradient-border'
        >
          {selectedFiles.length < 1 && (
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='opacity-0'
              accept='image/*'
              multiple // Enable multiple file selection
              required
            />
          )}

          <div className='upload'>
            {selectedFiles.length < 1 && (
              <div className='flex flex-col items-center'>
                <Image
                  src='/businessregistration/Photograph.svg'
                  alt='add photo'
                  width={80}
                  height={80}
                  className='flex justify-self-center'
                />
                <p className='upload-drag font-bold max-lg:!text-sm'>{t('Drag your photos here')}</p>
                <p className='upload-photos max-lg:!text-sm max-lg:!mt-1'>{t('Choose at least 5 photos')}</p>
              </div>
            )}
          </div>
          {selectedFiles.length < 1 && (
            <p className='upload-text mb-3 max-lg:!mb-2 text-center max-lg:!text-sm'>{t('Upload from your device')}</p>
          )}

          <div className='preview-container'>
            {selectedFiles.map((fileUrl, index) => (
              <div
                key={index}
                className={
                  index === 0 ? 'first-image relative' : 'preview-image'
                }
              >
                {index === 0 && (
                  <span className='absolute left-5 top-5 flex items-center gap-1 rounded-full bg-[#F5F9FF] px-2 py-[0.325rem] text-xs font-medium text-black'>
                    <Image
                      src='/businessregistration/cover-photo.svg'
                      width='16'
                      height='16'
                      alt='cover photo'
                    />
                    <span>Cover photo</span>
                  </span>
                )}
                <Image
                  className='uploaded-image'
                  src={fileUrl}
                  alt={`Preview ${index + 1}`}
                  width={1200}
                  height={1200}
                  
                />
              </div>
            ))}

            {selectedFiles.length > 0 && (
              <div
                className='preview-image glass-border gradient-border-four add-section'
                onClick={handleClick}
              >
                <div className='add'>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden-file-input'
                    accept='image/*'
                    multiple // Enable multiple file selection
                    required
                  />
                  <Image
                    src='/businessregistration/PlusCircle.svg'
                    alt='plus'
                    width={24}
                    height={24}
                  />
                  <p>{t('Add More')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add displayName for the component
FormFour.displayName = 'FormFour';

export default FormFour;
