import React from 'react';
// import cn from 'classnames';
import s from './episode-info.module.scss';

const EpisodeInfo = ({ episode }) => (
  <div className='d-flex justify-content-between align-items-baseline'>
    <span className={s.episode}>Episode {episode.id}</span>
    <span className={s.title}>{episode.name}</span>
    <span className={s.date}>{episode.air_date}</span>
  </div>
);
export default EpisodeInfo;
