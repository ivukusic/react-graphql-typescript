import React, { SyntheticEvent } from 'react';

import Loader from '../Loader';

import './Button.style.scss';

interface Props {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onClick: (e: SyntheticEvent) => void;
}

export const Button = ({ disabled, label, loading, onClick }: Props) => (
  <button className="button" type="button" onClick={!loading && !disabled ? onClick : () => {}}>
    {loading ? <Loader /> : label}
  </button>
);

Button.defaultPros = {
  disabled: false,
  loading: false,
};

export default Button;
