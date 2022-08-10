import React from 'react';
import cn from 'classnames';
import s from './button.module.scss';

const Button = ({ label, onClick, className }) => {
  return (
    <button className={cn(s.button, className)} type='button' onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
