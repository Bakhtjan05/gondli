'use client';

import { useState } from 'react';
import FormTwo from './formtwo/FormTwo';
import FormOne from './formone/FormOne';
import FormThree from './formthree/FormThree';
import FormFour from './formfour/FormFour';
import FormFive from './formfive/FormFive';
import FormSix from './formsix/FormSix';
import FormSeven from './formseven/FormSeven';
import FormEight from './formeight/FormEight';
import FormTen from './formten/FormTen';
import FormEleven from './formeleven/FormEleven';
import FormThirteen from './formthirteen/FormThirteen';
import FormFourteen from './formfourteen/FormFourteen';
import FormNine from './formnine/FormNine';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ResultForm from './resultForm/ResultForm';
import { useDispatch, useSelector } from 'react-redux';

import { setStep, selectStepState } from '@/slices/stepSlice';

interface FormComponentProps {
  formData: {
    name: string;
    venue: string;
    address: string;
    description: string;
    logo: File | null;
    venueFiles: File[];
    country: string;
    city: string;
    streetAddress: string;
    suite: Number;
    zipCode: string;
    time: string;
    candleNames: string[];
    oilNames: string[];
    fragranceNames: string[];
    services: string[];
    extraServices: string;
    additions: string[];
    practitioners: string[];
  };
  handleChange: (e: { target: { name: string; value: string } }) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Form() {
  const initialFormData = {
    name: '',
    venue: '',
    address: '',
    description: '',
    logo: null,
    venueFiles: [],
    country: '',
    city: '',
    streetAddress: '',
    suite: '',
    zipCode: '',
    time: '',
    candleNames: '',
    oilNames: '',
    fragranceNames: '',
    services: '',
    extraServices: '',
    additions: [],
    practitioners: [],
  };

  const t = useTranslations();

  const { step, nextStep, previousStep, setStep, totalSteps } = useSelector(selectStepState);
  const [formData, setFormData] = useState(initialFormData);
  console.log('Form nextStep:', nextStep);

  const handleNextStep = () => {
    if (step < totalSteps) {
      nextStep();
    }
    console.log(step)
  };



  const handleChangeTwo = (
    name: string,
    value: string | File | File[] | any[],
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleFilesChange = (files: any) => {
    setFormData((prevData) => ({
      ...prevData,
      venueFiles: files,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setFormData(initialFormData);
    setStep(1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <FormOne formData={formData} handleChange={handleChange} />
        )}

        {step === 2 && (
          <FormTwo formData={formData} handleChange={handleChange} />
        )}

        {step === 3 && (
          <FormThree formData={formData} handleChange={handleChange} />
        )}

        {step === 4 && <FormFour onFilesChange={handleFilesChange} />}

        {step === 5 && (
          <FormFive formData={formData} handleChange={handleChange} />
        )}
        {step === 6 && (
          <FormSix formData={formData} handleChange={handleChange} />
        )}

        {step === 7 && (
          <FormSeven formData={formData} handleChange={handleChange} />
        )}

        {step === 8 && (
          <FormEight formData={formData} handleChange={handleChangeTwo} />
        )}

        {step === 9 && (
          <FormNine formData={formData} handleChange={handleChangeTwo} />
        )}

        {step === 10 && (
          <FormTen
            formData={{
              services: '',
            }}
            handleChange={handleChangeTwo}
          />
        )}

        {step === 11 && (
          <FormEleven formData={formData} handleChange={handleChangeTwo} />
        )}

        {step === 12 && (
          <FormThirteen
            handleChange={handleChangeTwo}
            formData={{
              additions: '',
            }}
          />
        )}

        {step === 13 && (
          <FormFourteen formData={formData} handleChange={handleChange} />
        )}

        {step === 14 && (
          <ResultForm formData={formData} />
        )}
      </form>
      <div className='form-footer flex-wrap '>
        <div className='w-full flex items-center justify-between'>
          <button
            type='button'
            className='footer-back max-lg:!text-sm'
            onClick={previousStep}
            disabled={step === 1}
          >
            <Image
              src='/businessregistration/ArrowNarrowLeft.svg'
              alt='Go back'
              width={14}
              height={14}
            />
            {t('Go back')}
          </button>

          <div className='footer-progress max-lg:!hidden'>
            <Image
              src='/businessregistration/Check.svg'
              alt='Go back'
              width={20}
              height={20}
            />
            {t('Progress Automatically Saved')}
          </div>

          <div className='footer-last '>
            <button
              className='footer-preview max-lg:!text-sm'
              type='button'
            >
              {t('Preview')}
              <Image
                src='/businessregistration/ArrowDown.svg'
                alt='preview'
                width={14}
                height={14}
              />
            </button>

            {step < 14 ? (
              <button className='footer-next max-lg:!text-sm' type='button' onClick={handleNextStep}>
                {t('next-step')}
              </button>
            ) : (
              <button
                className='footer-next max-lg:!text-sm'
                type='button'
                onClick={handleSubmit}
              >
                {t('Submit')}
              </button>
            )}
          </div>
        </div>

        <div className='footer-progress w-full lg:!hidden mt-4 mb-2 max-lg:!text-sm max-lg:!flex max-lg:!justify-center'>
          <Image
            src='/businessregistration/Check.svg'
            alt='Go back'
            width={20}
            height={20}
          />
          <p>{t('Progress Automatically Saved')}</p>
        </div>
      </div>
    </>
  );
}
