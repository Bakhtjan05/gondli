// NumberInput.tsx
import React from 'react';
import Image from 'next/image';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  variant?: 'counter' | 'unit';
  unitTitle?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = '0 Min',
  min = 0,
  max = Infinity,
  step = 1,
  className = '',
  disabled = false,
  isLoading = false,
  error,
  variant = 'counter',
  unitTitle = 'CHF',
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    const newValue = numericValue === '' ? 0 : Number(numericValue);

    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`input-card flex w-[170px] rounded-[12px] bg-[#7597a0] pr-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      <input
        className='h-[50px] w-[100px] max-lg:!w-full flex-1 border-r border-[#64919B] bg-transparent px-3 placeholder:text-[#C4D1D4]'
        type='text'
        value={value === 0 ? '' : value.toString()} // Show empty string when value is 0
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled || isLoading}
      />
      {variant === 'counter' ? (
        // Counter Variant
        <div className='min-w-[60px] flex items-center'>
          <button
            type='button'
            onClick={handleDecrement}
            disabled={disabled || isLoading || value <= min}
            className='ml-1 max-lg:!ml-2 flex flex-1 max-lg:!flex-initial items-center justify-center text-[1.5rem]'
          >
            <Image
              src='/businessregistration/Minus.svg'
              alt='minus'
              width={16}
              height={16}
              className='eleven-icon'
            />
          </button>
          <button
            type='button'
            onClick={handleIncrement}
            disabled={disabled || isLoading || value >= max}
            className='flex flex-1 max-lg:!flex-initial max-lg:!ms-3 items-center justify-center text-[1.5rem]'
          >
            <Image
              src='/businessregistration/Plus.svg'
              alt='plus'
              width={16}
              height={16}
              className='eleven-icon'
            />
          </button>
        </div>
      ) : (
        // Unit Variant
        <div className='flex min-w-[60px] items-center justify-center px-2 max-lg:!pl-0 text-center text-sm text-[#C4D1D4]'>
          {unitTitle}
        </div>
      )}
    </div>
  );
};

export default NumberInput;
