import React, { SyntheticEvent } from 'react';

import './Button.style.scss';

interface Props {
  disabled?: boolean;
  label: string;
  onClick: (e: SyntheticEvent) => void;
}

export const Button = ({ disabled, label, onClick }: Props) => (
  <button className="button" type="button" onClick={!disabled ? onClick : () => {}}>
    {label}
  </button>
);

Button.defaultPros = {
  disabled: false,
};

export default Button;
