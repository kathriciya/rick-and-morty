import React from 'react';
import EpisodeItem from '../episode-item/episode-item';
import cn from 'classnames';
import s from './episode-list.module.scss';

const EpisodeList = ({ episodes }) => {
  const elements = episodes.map((item) => {
    return (
      <EpisodeItem
        key={item.id}
        date={item.air_date}
        title={item.name}
        episode={item.episode}
      />
    );
  });
  return (
    <div className={s.episode_list_wrap}>
      <ul className={cn('list-group', s.list)}>{elements}</ul>
    </div>
  );
};
export default EpisodeList;
