import React, { useState, useEffect } from 'react';
import FormHeader from '../../FormHeader/FormHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import './Formeight.scss';

interface FormEightProps {
  formData: {
    candleNames: string; // Holds the stringified array of candle names
    oilNames: string; // Holds the stringified array of oil names
    fragranceNames: string; // Holds the stringified array of fragrance names
  };
  handleChange: (name: string, value: string) => void; // Function to update formData
}

export default function FormEight({ formData, handleChange }: FormEightProps) {
  const t = useTranslations();
  console.log(formData)

  // States for candle, oil, and fragrance
  const [candleName, setCandleName] = useState<string>('');
  const [oilName, setOilName] = useState<string>('');
  const [fragranceName, setFragranceName] = useState<string>('');

  // Lists for candle, oil, and fragrance names
  const [candleList, setCandleList] = useState<string[]>([]);
  const [oilList, setOilList] = useState<string[]>([]);
  const [fragranceList, setFragranceList] = useState<string[]>([]);

  // State to track which input is currently focused
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleCandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandleName(e.target.value);
  };

  const handleOilInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOilName(e.target.value);
  };

  const handleFragranceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFragranceName(e.target.value);
  };

  const addItem = (type: string, value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return; // Don't add empty strings

    if (type === 'candle' && !candleList.includes(trimmedValue)) {
      setCandleList((prevList) => [...prevList, trimmedValue]);
      setCandleName('');
    } else if (type === 'oil' && !oilList.includes(trimmedValue)) {
      setOilList((prevList) => [...prevList, trimmedValue]);
      setOilName('');
    } else if (type === 'fragrance' && !fragranceList.includes(trimmedValue)) {
      setFragranceList((prevList) => [...prevList, trimmedValue]);
      setFragranceName('');
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value =
        type === 'candle'
          ? candleName
          : type === 'oil'
            ? oilName
            : fragranceName;
      addItem(type, value);
    }
  };

  const handleBlur = (type: string) => {
    setFocusedInput(null);
    const value =
      type === 'candle' ? candleName : type === 'oil' ? oilName : fragranceName;
    addItem(type, value);
  };

  const handleFocus = (type: string) => setFocusedInput(type);

  // Update formData with stringified lists whenever they change
  useEffect(() => {
    handleChange('candleNames', JSON.stringify(candleList));
    handleChange('oilNames', JSON.stringify(oilList));
    handleChange('fragranceNames', JSON.stringify(fragranceList));
  }, [candleList, oilList, fragranceList]);

  return (
    <div className='form-eight-main'>
      <FormHeader
        title={t('Do you provide additional comfort options? (Skippable)')}
        desc={t('Enhance your clients experience')}
      />

      <div className='form-eight-box gradient-border'>
        {/* Candle Section */}
        <div className='eight'>
          <div className='eight-topic'>
            <div>
              
            </div>
            <span className='eight-icon-desc'>{t('Candle Scents')}</span>
          </div>
          <ul
            className={`eight-list glass-border gradient-eight-border ${focusedInput === 'candle' ? 'typing' : ''}`}
          >
            {candleList.map((candle, index) => (
              <li
                className='eight-item glass-border gradient-border'
                key={index}
              >
                {candle}
              </li>
            ))}
            <input
              className='eight-input'
              type='text'
              value={candleName}
              onChange={handleCandleInputChange}
              onKeyDown={(e) => handleKeyPress(e, 'candle')}
              onFocus={() => handleFocus('candle')}
              onBlur={() => handleBlur('candle')}
              placeholder={t('Enter all options tag')}
            />
          </ul>
        </div>

        {/* Oil Section */}
        <div className='eight'>
          <div className='eight-topic'>
            <div>
              
            </div>
            <span className='eight-icon-desc'>{t('Oil Types')}</span>
          </div>
          <ul
            className={`eight-list glass-border gradient-eight-border ${focusedInput === 'oil' ? 'typing' : ''}`}
          >
            {oilList.map((oil, index) => (
              <li
                className='eight-item glass-border gradient-border'
                key={index}
              >
                {oil}
              </li>
            ))}
            <input
              className='eight-input'
              type='text'
              value={oilName}
              onChange={handleOilInputChange}
              onKeyDown={(e) => handleKeyPress(e, 'oil')}
              onFocus={() => handleFocus('oil')}
              onBlur={() => handleBlur('oil')}
              placeholder={t('Enter all options tag')}
            />
          </ul>
        </div>

        {/* Fragrance Section */}
        <div className='eight-last'>
          <div className='eight-topic'>
            <div>
              
            </div>
            <span className='eight-icon-desc'>{t('Fragrance Types')}</span>
          </div>

          <ul
            className={`eight-list glass-border gradient-eight-border ${focusedInput === 'fragrance' ? 'typing' : ''}`}
          >
            {fragranceList.map((fragrance, index) => (
              <li
                className='eight-item glass-border gradient-border'
                key={index}
              >
                {fragrance}
              </li>
            ))}
            <input
              className='eight-input'
              type='text'
              value={fragranceName}
              onChange={handleFragranceInputChange}
              onKeyDown={(e) => handleKeyPress(e, 'fragrance')}
              onFocus={() => handleFocus('fragrance')}
              onBlur={() => handleBlur('fragrance')}
              placeholder={t('Enter all options tag')}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
