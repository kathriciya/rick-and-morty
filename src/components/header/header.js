import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';

const Header = () => {
  const setActiveLink = ({ isActive }) =>
    isActive ? `${s.link} ${s.active}` : s.link;
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav>
          <ul className={cn('d-flex', s.list)}>
            <li className={s.item}>
              <NavLink to='/' className={setActiveLink}>
                Main
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink to='/episode' className={setActiveLink}>
                Episodes
              </NavLink>
            </li>

            <li className={s.item}>
              <NavLink to='/location' className={setActiveLink}>
                Locations
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink to='/character' className={setActiveLink}>
                Characters
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
