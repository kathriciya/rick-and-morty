import React from 'react';
import cn from 'classnames';
import s from './header.module.scss';

const Header = () => (
  <header className={s.header}>
    <div className={s.wrapper}>
      <ul className={cn('d-flex', s.list)}>
        <li className={s.item}>Episodes</li>
        <li className={s.item}>Locations</li>
        <li className={s.item}>Characters</li>
      </ul>
    </div>
  </header>
);

export default Header;
