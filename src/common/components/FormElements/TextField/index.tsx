import React, { ChangeEvent } from 'react';

import './TextField.style.scss';

interface Props {
  disabled?: boolean;
  error?: string;
  field: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  value: string;
}

export const TextField = ({ disabled, error, field, label, onChange, required, type, value }: Props) => (
  <div className={`text-field${error ? ' text-field--error' : ''}`}>
    <label htmlFor={field}>{`${label}${required ? '*' : ''}`}</label>
    <input
      className={`${disabled ? 'disabled' : ''}`}
      type={type}
      value={value}
      onChange={!disabled ? onChange : () => {}}
    />
    <div className="text-field__error-message">{error}</div>
  </div>
);

TextField.defaultProps = {
  disabled: false,
  error: '',
  required: false,
  type: 'text',
};

export default TextField;
