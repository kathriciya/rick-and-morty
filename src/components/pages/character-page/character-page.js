import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectEpisodesData } from '../../../store/episodes';
// import cn from 'classnames';
import api from '../../../api/api';
import Error from '../../error-message/error-message';
import Layout from '../../layout/layout';
import Loader from '../../loader/loader';
import s from './character-page.mudule.scss';

const CharacterPage = () => {
  const episodesRedux = useSelector(selectEpisodesData);
  const { characterId } = useParams();
  const [person, setPerson] = useState({
    image: '',
    name: '',
    location: '',
    episode: [],
    species: '',
    gender: '',
    status: '',
    origin: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const characterRequest = await api.getCharacter(characterId);
        setPerson(characterRequest);
        setLoading(false);
      } catch (e) {
        setErr(true);
      }
    }
    fetchData();
  }, [characterId]);

  const episodes = episodesRedux.filter((item) =>
    person.episode.includes(item.url)
  );

  const modifyUrl = (url) => {
    const num = url.match(/\d+$/);
    return `Episode ${num}`;
  };

  if (err) {
    return <Error />;
  }

  if (loading && !err) {
    return <Loader />;
  }

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
              {person.episode.length}
            </span>
          </div>
          <img className={s.image} src={person.image} alt='Person' />
        </div>

        <span className={s.info__last}>
          <b className={s.label}>Episodes:</b>
        </span>
        <ul className={s.list}>
          {episodes.map((item) => (
            <li className={s.character_item} key={item.id}>
              <span>{item.name}</span>
              <span>({modifyUrl(item.url)})</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CharacterPage;
