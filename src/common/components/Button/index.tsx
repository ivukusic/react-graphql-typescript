import React, { SyntheticEvent } from 'react';

import Loader from '../Loader';

import './Button.style.scss';

interface Props {
  className?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onClick: (e: SyntheticEvent) => void;
  type: string;
}

export const Button = ({ className, disabled, label, loading, onClick, type }: Props) => (
  <button
    className={`button${type ? ` button--${type}` : ''}${className ? ` ${className}` : ''}`}
    type="button"
    onClick={!loading && !disabled ? onClick : () => {}}
  >
    {loading ? <Loader /> : label}
  </button>
);

Button.defaultProps = {
  className: '',
  disabled: false,
  loading: false,
  type: '',
};
