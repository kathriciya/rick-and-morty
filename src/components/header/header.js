import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';
import logo from '../../assets/logo.png';

const MENU = [
  {
    title: 'Episodes',
    to: '/episode',
  },
  {
    title: 'Locations',
    to: '/location',
  },
  {
    title: 'Characters',
    to: '/character',
  },
];

const Header = () => {
  const setActiveLink = ({ isActive }) =>
    isActive ? `${s.link} ${s.active}` : s.link;
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Link to='/' className={s.logo_link}>
          <img className={s.logo} src={logo} alt='logo' />
        </Link>
        <nav>
          <ul className={cn('d-flex', s.list)}>
            {MENU.map(({ title, to }, i) => (
              <li key={i} className={s.item}>
                <NavLink to={to} className={setActiveLink}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
