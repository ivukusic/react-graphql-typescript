import React, { SyntheticEvent } from 'react';
import { IoIosCheckmark } from 'react-icons/io';

import './Checkbox.style.scss';

interface Props {
  className?: string;
  color?: string;
  disabled?: boolean;
  error?: string;
  field: string;
  label: string;
  onClick: (e: SyntheticEvent) => void;
  required?: boolean;
  value: string;
}

export const Checkbox = ({ className, color, disabled, error, field, label, onClick, required, value }: Props) => (
  <div className={`checkbox${error ? `${className}` : ''}`} onClick={onClick}>
    <div className={`checkbox__box${error ? ' checkbox__box--error' : ''}`}>
      {value && <IoIosCheckmark className={`${disabled ? 'disabled' : ''}`} size={24} />}
    </div>
    <label htmlFor={field}>{`${label}${required ? '*' : ''}`}</label>
  </div>
);

Checkbox.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  required: false,
};

export default Checkbox;
