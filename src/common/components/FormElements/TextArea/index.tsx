import React, { ChangeEvent } from 'react';

import './TextArea.style.scss';

interface Props {
  disabled?: boolean;
  field: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  type?: string;
  value: string;
}

export const TextArea = ({ disabled, field, label, onChange, type, value }: Props) => (
  <div className="textarea">
    <label htmlFor={field}>{label}</label>
    <textarea className={`${disabled ? 'disabled' : ''}`} value={value} onChange={onChange} />
  </div>
);

TextArea.defaultPros = {
  disabled: false,
  type: 'text',
};

export default TextArea;
