import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './main-page.module.scss';
import Layout from '../../layout/layout';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/episode');
  };
  return (
    <Layout title='MainPage'>
      <button className={s.button} type='button' onClick={handleClick}>
        catalogue
      </button>
    </Layout>
  );
};

export default MainPage;
