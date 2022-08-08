import React from 'react';
import cn from 'classnames';
import EpisodeItem from '../episode-item/episode-item';

import s from './episode-list.module.scss';

const EpisodeList = ({ episodes }) => {
  // console.log('episodes : ', episodes);
  const elements = episodes.map((item) => (
    <EpisodeItem
      key={item.id}
      date={item.air_date}
      title={item.name}
      episode={item.episode}
      url={item.url}
    />
  ));
  return (
    <div className={s.episode_list_wrap}>
      <ul className={cn('list-group', s.list)}>{elements}</ul>
    </div>
  );
};
export default EpisodeList;
