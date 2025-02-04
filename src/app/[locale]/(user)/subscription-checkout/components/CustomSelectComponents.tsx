import React from 'react';
import { components, OptionProps } from 'react-select';
import './CustomSelectComponents.scss';

const { Option } = components;
export function CustomSelectOption(props: OptionProps | any) {
  return (
    <Option {...props}>
      <div className='select-option'>
        <div className='icon'>{props?.data!.icon}</div>
        <div className='label'>{props.data.label}</div>
      </div>
    </Option>
  );
}

export function CustomSelectValue(props: any) {
  return (
    <div className='selected-value'>
      <div className='icon'>{props?.data!.icon}</div>
      <div className='label'>{props.data.label}</div>
    </div>
  );
}
