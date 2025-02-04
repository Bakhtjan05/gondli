'use client';
import React, { useState } from 'react';
import './ExtraOption.scss';

interface ExtraOptionComponentProps {
  label: any;
  icon: string;
  placeholder: string;
}

const ExtraOptionComponent: React.FC<ExtraOptionComponentProps> = ({
  label,
  icon,
  placeholder,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      addTag();
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== '') {
      addTag();
    }
  };

  const addTag = () => {
    setTags([...tags, inputValue.trim()]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='tag-input-component'>
      <div className='label'>
        <img src={icon} alt='' className='label-icon' />
        <span>{label}</span>
      </div>
      <div className='tags-input-container'>
        {tags.map((tag, index) => (
          <div className='tag' key={index}>
            {tag}
            <span className='remove-tag' onClick={() => removeTag(index)}>
              ×
            </span>
          </div>
        ))}
        <input
          type='text'
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur} 
        />
      </div>
    </div>
  );
};

export default ExtraOptionComponent;
