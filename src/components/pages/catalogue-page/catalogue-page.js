import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchPanel from '../../search-panel/search-panel';
import SeasonFilter from '../../season-filter/season-filter';
import EpisodeList from '../../episode-list/episode-list';
import { getEpisodesAsync } from '../../../store/episodes';
import api from '../../../api/api';
import s from './catalogue-page.module.scss';
import Layout from '../../layout/layout';
import Error from '../../error-message/error-message';
import Loader from '../../loader/loader';

const CataloguePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('S01');
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const episodesRequest = await api.getAllEpisodes();
        setEpisodes(episodesRequest);
        dispatch(getEpisodesAsync(episodesRequest));
        setLoading(false);
      } catch (e) {
        setErr(true);
      }
    }
    fetchData();
  }, [dispatch]);

  if (err) {
    return <Error />;
  }

  if (loading && !err) {
    return <Loader />;
  }

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
    <Layout title='Rick and Morty episodes catalogue'>
      <div className={s.app_panel}>
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <SeasonFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>
      <EpisodeList episodes={visibleSeason} />
    </Layout>
  );
};

export default CataloguePage;
