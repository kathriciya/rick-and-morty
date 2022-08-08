import React from 'react';
import SearchPanel from '../../search-panel/search-panel';
import SeasonFilter from '../../season-filter/season-filter';
import EpisodeList from '../../episode-list/episode-list';
import s from './catalogue-page.module.scss';
import Layout from '../../layout/layout';

const CataloguePage = (props) => {
  const { onUpdateSearch, filter, onFilterSelect, visibleSeason } = props;
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
