import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import s from './app.module.scss';

import {
  MainPage,
  EpisodePage,
  CharacterPage,
  NotFoundPage,
  CataloguePage,
  LocationPage,
  DataPage,
} from '../pages';
import Footer from '../footer/footer';
import Header from '../header/header';

const App = () => {
  return (
    <BrowserRouter>
      <div className={s.grid}>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/episode' element={<CataloguePage />} />
          <Route path='/episode/:episodeId' element={<EpisodePage />} />
          <Route path='/location' element={<DataPage dataType='locations' />} />
          <Route path='/location/:locationId' element={<LocationPage />} />
          <Route
            path='/character'
            element={<DataPage dataType='characters' />}
          />
          <Route path='/character/:characterId' element={<CharacterPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
