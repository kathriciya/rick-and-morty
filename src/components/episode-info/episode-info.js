import React from 'react';
// import cn from 'classnames';
import s from './episode-info.module.scss';

const EpisodeInfo = ({ episode }) => {
  const numberId = episode.url.match(/\d+$/);
  const number = numberId[0];
  return (
    <div className='d-flex justify-content-between align-items-baseline'>
      <span className={s.episode}>Episode {number}</span>
      <span className={s.title}>{episode.name}</span>
      <span className={s.date}>{episode.air_date}</span>
    </div>
  );
};
export default EpisodeInfo;
