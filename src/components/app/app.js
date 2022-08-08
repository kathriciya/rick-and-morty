import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import api from '../../api/api';

import {
  MainPage,
  EpisodePage,
  CharacterPage,
  NotFoundPage,
  CataloguePage,
  LocationAllPage,
  CharacterAllPage,
} from '../pages';
import Footer from '../footer/footer';
import Header from '../header/header';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filter, setFilter] = useState('S01');
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.getAllEpisodes().then((res) => {
      setEpisodes(res);
    });
  }, []);

  const filterPost = (items, filterType) =>
    items.filter((item) => item.episode.includes(filterType));

  const onFilterSelect = (filterType) => {
    setFilter(filterType);
  };

  const searchEmp = (items, character) => {
    if (character.length === 0) {
      return items;
    }

    const value = character.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().startsWith(value));
  };

  const onUpdateSearch = (character) => {
    setTerm(character);
  };

  const visibleSeason = filterPost(searchEmp(episodes, term), filter);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route
          path='/episode'
          element={
            <CataloguePage
              onUpdateSearch={onUpdateSearch}
              filter={filter}
              onFilterSelect={onFilterSelect}
              visibleSeason={visibleSeason}
            />
          }
        />
        <Route
          path='/episode/:episodeId'
          element={<EpisodePage visibleSeason={visibleSeason} />}
        />
        <Route
          path='/episode/:episodeId/character/:characterId'
          element={<CharacterPage />}
        />
        <Route path='/location' element={<LocationAllPage />} />
        <Route path='/character' element={<CharacterAllPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
