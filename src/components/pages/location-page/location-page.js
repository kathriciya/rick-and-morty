import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import cn from 'classnames';
import api from '../../../api/api';
import CharacterList from '../../character-list/character-list';
import Layout from '../../layout/layout';
import s from './location-page.mudule.scss';

const LocationPage = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState({
    name: '',
    type: '',
    dimension: '',
    residents: [],
  });

  useEffect(() => {
    api.getLocation(locationId).then((res) => {
      setLocation({
        name: res.name,
        type: res.type,
        dimension: res.dimension,
        residents: [...res.residents],
      });
    });
  });

  return (
    <Layout title='Location information'>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column '>
            <span className={s.info}>
              <b className={s.label}>Name:</b> {location.name}
            </span>
            <span className={s.info}>
              <b className={s.label}>Type:</b> {location.type}
            </span>
            <span className={s.info}>
              <b className={s.label}>Dimension:</b> {location.dimension}
            </span>
            <span className={s.info}>
              <b className={s.label}>Number of residents: </b>
              {location.residents.length}
            </span>
          </div>
        </div>
        <span className={s.info__last}>
          <b className={s.label}>Residents:</b>
        </span>
        <CharacterList location={location} />
      </div>
    </Layout>
  );
};

export default LocationPage;
