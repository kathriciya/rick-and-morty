import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/layout';
import s from './not-found-page.module.scss';

const NotFoundPage = () => (
  <Layout>
    <span className={s.error}>Page doesn&apos;t exist</span>
    <Link className={s.link} to='/'>
      Back to main page
    </Link>
  </Layout>
);

export default NotFoundPage;
