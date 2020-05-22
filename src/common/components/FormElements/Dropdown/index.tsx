import React, { createRef, useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './Dropdown.style.scss';

interface Props {
  className?: string;
  data: any[];
  disabled?: boolean;
  error: string;
  field?: string;
  idKey: string;
  keys: { display: string; separator?: string }[];
  label?: string;
  onSelect: (value: any) => void;
  placeholderClassName?: string;
  required?: boolean;
  value: any;
}

export const Dropdown = ({
  className,
  data,
  disabled,
  error,
  field,
  idKey,
  keys,
  label,
  onSelect,
  placeholderClassName,
  required,
  value,
}: Props) => {
  const dropdown: any = createRef();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setOpened(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdown, opened]);

  const dropdownClick = () => {
    if (!disabled) {
      setOpened(!opened);
    }
  };

  const onSelectValue = (value: any) => () => {
    onSelect(value);
  };

  const placeholder = () => {
    return <div className={`d-flex flex-grow-1 ${placeholderClassName}`}>{value ? getOption(value) : 'Select'}</div>;
  };

  const getOption = (item: any) => {
    let displayValue = '';
    keys.forEach(({ display, separator }: { display: string; separator?: string }) => {
      if (item[display]) {
        displayValue += item[display];
      }
      if (separator) {
        displayValue += separator;
      }
    });
    return displayValue;
  };

  return (
    <div className={`dropdown${error ? ' dropdown--error' : ''}${className ? ` ${className}` : ''}`} ref={dropdown}>
      {label && <label htmlFor={field}>{`${label}${required ? '*' : ''}`}</label>}
      <div className={`dropdown-content ${disabled ? ' dropdown-content--disabled' : ''}`} onClick={dropdownClick}>
        {placeholder()}
        <MdKeyboardArrowDown size={14} color="#323232" />
        <ul className={`${opened ? 'opened' : ''}`}>
          {data.map(item => (
            <li key={item[idKey]} onClick={onSelectValue(item)}>
              {getOption(item)}
            </li>
          ))}
        </ul>
      </div>
      <div className="textarea__error-message">{error}</div>
    </div>
  );
};

Dropdown.defaultProps = {
  disabled: false,
  error: '',
  field: '',
  label: '',
  required: false,
  type: 'text',
};
