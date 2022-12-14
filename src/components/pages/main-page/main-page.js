import React from 'react';
import { useNavigate } from 'react-router-dom';
// import cn from 'classnames';
import s from './main-page.module.scss';
import Layout from '../../layout/layout';
import Button from '../../button/button';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/episode');
  };
  return (
    <Layout
      title='Rick and Morty'
      desc='Rick is a mad scientist who drags his grandson, Morty, on wild and crazy
        sci-fi adventures.'
    >
      <Button className={s.btn} label='Watch episodes' onClick={handleClick} />
      <div className={s.box}>
        <div className={s.heros} />
      </div>
    </Layout>
  );
};

export default MainPage;
