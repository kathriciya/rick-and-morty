import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import api from '../../api/api';

import { MainPage, EpisodePage, CharacterPage } from '../pages';
import Footer from '../footer/footer';
import Header from '../header/header';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  // console.log('episodes: ', episodes);
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
        <Route
          path='/'
          element={
            <MainPage
              onUpdateSearch={onUpdateSearch}
              filter={filter}
              onFilterSelect={onFilterSelect}
              visibleSeason={visibleSeason}
            />
          }
        />
        <Route
          path='/:episodeId'
          element={<EpisodePage visibleSeason={visibleSeason} />}
        />
        <Route
          path='/:episodeId/character/:characterId'
          element={<CharacterPage />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
