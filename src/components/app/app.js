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
  const [filter, setFilter] = useState('S05');
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.getAllEpisodes().then((res) => {
      setEpisodes(res);
      console.log(res);
    });
  }, []);

  const filterPost = (items, filter) => {
    return items.filter((item) => item.episode.includes(filter));
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
