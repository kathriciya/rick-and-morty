import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodesAsync, selectEpisodesData } from '../../store/episodes';
import api from '../../api/api';
import s from './app.module.scss';

import {
  MainPage,
  EpisodePage,
  CharacterPage,
  NotFoundPage,
  CataloguePage,
  LocationAllPage,
  CharacterAllPage,
  LocationPage,
} from '../pages';
import Footer from '../footer/footer';
import Header from '../header/header';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  console.log('episodes: ', episodes);
  const dispatch = useDispatch();
  const episodesRedux = useSelector(selectEpisodesData);
  console.log('episodesRedux: ', episodesRedux);

  const [filter, setFilter] = useState('S01');
  const [term, setTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const episodesRequest = await api.getAllEpisodes();
      setEpisodes(episodesRequest);
      dispatch(getEpisodesAsync(episodesRequest));
    }
    fetchData();
  }, [dispatch]);

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
      <div className={s.grid}>
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
          <Route path='/location' element={<LocationAllPage />} />
          <Route path='/location/:locationId' element={<LocationPage />} />
          <Route path='/character' element={<CharacterAllPage />} />
          <Route path='/character/:characterId' element={<CharacterPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
