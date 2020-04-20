import React, { ChangeEvent } from 'react';

import './TextField.style.scss';

interface Props {
  disabled?: boolean;
  field: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
}

export const TextField = ({ disabled, field, label, onChange, type, value }: Props) => (
  <div className="text-field">
    <label htmlFor={field}>{label}</label>
    <input className={`${disabled ? 'disabled' : ''}`} type={type} value={value} onChange={onChange} />
  </div>
);

TextField.defaultPros = {
  disabled: false,
  type: 'text',
};

export default TextField;
