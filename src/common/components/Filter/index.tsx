import React from 'react';
import { useForm } from '../FormElements/Form.hook';
import { FormInputType } from '../../types';

import './Filter.style.scss';

interface Props {
  className?: string;
  filters?: Array<{ string: FormInputType }>;
  onFilterChange?: any;
}

const Filter = ({ className, filters, onFilterChange }: Props): JSX.Element | null => {
  const { renderDropdown } = useForm(filters, onFilterChange);
  if (!filters || !Object.keys(filters).length) {
    return null;
  }
  return (
    <div className={`filters${className ? ` ${className}` : ''}`}>
      {Object.keys(filters).map(key => renderDropdown(key))}
    </div>
  );
};

export default Filter;
