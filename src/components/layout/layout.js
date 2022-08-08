import React from 'react';
import s from './layout.module.scss';

const Layout = ({ title, urlBg, colorBg, children }) => {
  const layotBg = {
    backgroundImage: urlBg ? `url("${urlBg}")` : null,
    backgroundColor: `${colorBg}`,
  };
  return (
    <section className={s.root} style={layotBg}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{title}</h2>
        <div className={`{${s.desc}}, ${s.full}`}>{children}</div>
      </div>
    </section>
  );
};

export default Layout;
