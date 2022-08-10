import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './location-all-page.module.scss';
import Layout from '../../layout/layout';
import api from '../../../api/api';
import SearchPanel from '../../search-panel/search-panel';
import Button from '../../button/button';

const LocationAllPage = () => {
  const [locations, setLocations] = useState([]);
  const [pageLocations, setPageLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [locationsEnded, setLocationsEnded] = useState(false);
  const [term, setTerm] = useState('');

  const onLocationsLoaded = (newLocationsList) => {
    let ended = false;
    if (newLocationsList.length < 19) {
      ended = true;
    }
    setPageLocations([...pageLocations, ...newLocationsList]);
    setnewItemLoading(false);
    setPage(page + 1);
    setLocationsEnded(ended);
  };

  const onRequest = (pageNum, initial) => {
    // eslint-disable-next-line no-unused-expressions
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    api.getPageLocations(pageNum).then(onLocationsLoaded);
  };

  useEffect(() => {
    api.getAllLocations().then((res) => setLocations(res));
  }, []);

  useEffect(() => {
    onRequest(page, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchEmp = (items, character) => {
    const value = character.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().startsWith(value));
  };

  const onUpdateSearch = (character) => {
    setTerm(character);
  };

  const visibleLocations = searchEmp(locations, term);

  return (
    <Layout
      title='Locations'
      desc={` A total of ${locations.length} locations. ${pageLocations.length} locations shown`}
    >
      <div className={s.app_panel}>
        <SearchPanel className={s.search} onUpdateSearch={onUpdateSearch} />
      </div>
      {term.length > 0 ? (
        <ul className={s.list}>
          {visibleLocations.map((item) => {
            return (
              <li key={item.id} name={item.name} className={s.item}>
                <Link className={s.link} to={`/location/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <ul className={s.list}>
            {pageLocations.map((item) => {
              return (
                <li key={item.id} name={item.name} className={s.item}>
                  <Link className={s.link} to={`/location/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            className={s.load}
            disabled={newItemLoading}
            style={{ display: locationsEnded ? 'none' : 'block' }}
            label='Load More'
            onClick={() => onRequest(page)}
          />
        </div>
      )}
    </Layout>
  );
};

export default LocationAllPage;
