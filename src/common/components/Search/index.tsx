import React, { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './Search.style.scss';

interface Props {
  className?: string;
  onChangeText: (text: string) => void;
  value: string;
}

export const Search = ({ className, onChangeText, value }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  return (
    <div className={`search ${className ? className : ''}`}>
      <input type="text" placeholder="Search..." onChange={onChange} value={value} />
      <AiOutlineSearch size={20} color="#323232" />
    </div>
  );
};
export default Search;
