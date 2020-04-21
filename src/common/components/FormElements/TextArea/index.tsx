import React, { ChangeEvent } from 'react';

import './TextArea.style.scss';

interface Props {
  disabled?: boolean;
  error?: string;
  field: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  value: string;
}

export const TextArea = ({ disabled, error, field, label, onChange, required, value }: Props) => (
  <div className={`textarea${error ? ' textarea--error' : ''}`}>
    <label htmlFor={field}>{`${label}${required ? '*' : ''}`}</label>
    <textarea className={`${disabled ? 'disabled' : ''}`} value={value} onChange={onChange} />
    <div className="textarea__error-message">{error}</div>
  </div>
);

TextArea.defaultProps = {
  disabled: false,
  error: '',
  required: false,
};

export default TextArea;
