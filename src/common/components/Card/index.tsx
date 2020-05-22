import React from 'react';

interface Props {
  className?: string;
  children: any;
}

export const Card = ({ className, children }: Props): JSX.Element => (
  <div className={`card${className ? ` ${className}` : ''}`}>{children}</div>
);
