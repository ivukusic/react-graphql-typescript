import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './Dropdown.style.scss';

interface Props {
  className?: string;
  onSelect: (value: any) => void;
  placeholderClassName?: string;
  value: any;
}

export const Dropdown = ({ className, onSelect, placeholderClassName, value }: Props) => {
  const [opened, setOpened] = useState(false);
  //   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     onChangeText(e.target.value);
  //   };

  const dropdownClick = () => {
    setOpened(!opened);
  };

  const onSelectValue = (value: any) => () => {
    onSelect(value);
  };

  const placeholder = () => <div className={`d-flex flex-grow-1 ${placeholderClassName}`}>{value || 'Select'}</div>;

  return (
    <div className={`dropdown ${className ? className : ''}`} onClick={dropdownClick}>
      {placeholder()}
      <MdKeyboardArrowDown size={14} color="#323232" />

      <ul className={`${opened ? 'opened' : ''}`}>
        {[5, 10, 25].map(item => (
          <li key={item} onClick={onSelectValue(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dropdown;
