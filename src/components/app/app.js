import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import cn from 'classnames';
import s from './app.module.scss';
import EpisodeList from '../episode-list/episode-list';
import SearchPanel from '../search-panel/search-panel';
import SeasonFilter from '../season-filter/season-filter';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  console.log('episodes: ', episodes);
  const [filter, setFilter] = useState('Season 1');
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.getAllEpisodes().then((res) => {
      setEpisodes(res);
      console.log(res);
    });
  }, []);

  const filterPost = (items, filter) => {
    switch (filter) {
      case 'Season 1':
        console.log('items:,', items);
        return items.filter((item) => /S01/.test(item.episode));
      case 'Season 2':
        return items.filter((item) => /S02/.test(item.episode));
      case 'Season 3':
        return items.filter((item) => /S03/.test(item.episode));
      case 'Season 4':
        return items.filter((item) => /S04/.test(item.episode));
      case 'Season 5':
        return items.filter((item) => /S05/.test(item.episode));
      default:
        return items.filter((item) => /S01/.test(item.episode));
    }
  };

  const onFilterSelect = (filter) => {
    setFilter(filter);
  };

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    const value = term.toLowerCase();
    return items.filter((item) => {
      return item.name.toLowerCase().startsWith(value);
    });
  };

  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const visibleSeason = filterPost(searchEmp(episodes, term), filter);
  return (
    <div className={cn('container', s.app)}>
      <h1 className={cn('text-center', s.title)}>
        Rick and Morty episodes catalogue
      </h1>
      <div className={s.app_panel}>
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <SeasonFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>
      <EpisodeList episodes={visibleSeason} />
    </div>
  );
};
export default App;
