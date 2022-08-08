import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import cn from 'classnames';
import api from '../../api/api';
import Layout from '../layout/layout';
import s from './character-page.mudule.scss';

const CharacterPage = () => {
  const { characterId } = useParams();
  const [person, setPerson] = useState({
    image: '',
    name: '',
    location: '',
    episodes: [],
    species: '',
    gender: '',
    status: '',
    origin: '',
  });

  useEffect(() => {
    api.getCharacter(characterId).then((res) => {
      setPerson({
        image: res.image,
        name: res.name,
        species: res.species,
        gender: res.gender,
        status: res.status,
        origin: res.origin.name,
        location: res.location.name,
        episodes: [...res.episode],
      });
    });
  });

  const modifyUrl = (url) => {
    const num = url.match(/\d+$/);
    return `Episode ${num}`;
  };

  return (
    <Layout title='Character information'>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column '>
            <span className={s.info}>
              <b className={s.label}>Name:</b> {person.name}
            </span>
            <span className={s.info}>
              <b className={s.label}>Species:</b> {person.species}
            </span>
            <span className={s.info}>
              <b className={s.label}>Gender:</b> {person.gender}
            </span>
            <span className={s.info}>
              <b className={s.label}>Status:</b> {person.status}
            </span>
            <span className={s.info}>
              <b className={s.label}>Origin:</b> {person.origin}
            </span>
            <span className={s.info}>
              <b className={s.label}>Location:</b> {person.location}
            </span>
            <span className={s.info}>
              <b className={s.label}>Number of episodes: </b>
              {person.episodes.length}
            </span>
          </div>
          <img className={s.image} src={person.image} alt='Person' />
        </div>

        <span className={s.info__last}>
          <b className={s.label}>Episodes:</b>
        </span>
        <ul className={s.list}>
          {person.episodes.map((item, i) => (
            <li className={s.character_item} key={i}>
              {modifyUrl(item)}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CharacterPage;
