import React from 'react';
import s from './layout.module.scss';

const Layout = ({ title, urlBg, colorBg, children, desc }) => {
  const layotBg = {
    backgroundImage: urlBg ? `url("${urlBg}")` : null,
    backgroundColor: `${colorBg}`,
  };
  return (
    <main className={s.main} style={layotBg}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.desc}>{desc}</p>
        <div className={s.inner}>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
