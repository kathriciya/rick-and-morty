import React from 'react';
import cn from 'classnames';
import s from './episode-item.module.scss';

const EpisodeItem = ({ episode, title, date }) => {
  const number = episode.slice(-2).replace(/^0/, '');

  return (
    <li
      className={cn(
        'list-group-item d-flex flex-column flex-wrap ',
        s.episode_item
      )}
    >
      <span className={s.episode}>Episode {number}</span>
      <span className={s.title}>{title}</span>
      <span className={s.date}>{date}</span>
    </li>
  );
};
export default EpisodeItem;
