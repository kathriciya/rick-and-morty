import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './episode-item.module.scss';

const EpisodeItem = ({ episode, title, date, episodeId }) => {
  const number = episode.slice(-2).replace(/^0/, '');

  return (
    <li
      className={cn(
        'list-group-item d-flex flex-column flex-wrap ',
        s.episode_item
      )}
    >
      <Link className={s.link} to={`/episode/${episodeId}`}>
        <div className='d-flex align-items-baseline'>
          <span className={s.number}>{number}.</span>
          <span className={s.title}>{title}</span>
        </div>
        <div
          className={cn(
            'd-flex justify-content-between align-items-baseline',
            s.episode_inner
          )}
        >
          <span className={s.episode}>Episode {episodeId}</span>
          <span className={s.date}>{date}</span>
        </div>
      </Link>
    </li>
  );
};
export default EpisodeItem;
