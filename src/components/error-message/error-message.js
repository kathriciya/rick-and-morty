import React from 'react';
import s from './error-message.module.scss';

const Error = () => {
  return (
    <div className={s.error}>
      Sorry, something went wrong. Please try again later...
    </div>
  );
};

export default Error;
