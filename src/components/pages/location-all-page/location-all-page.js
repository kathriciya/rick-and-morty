import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './location-all-page.module.scss';
import Layout from '../../layout/layout';
import api from '../../../api/api';
import SearchPanel from '../../search-panel/search-panel';
import Button from '../../button/button';
import Error from '../../error-message/error-message';
import Loader from '../../loader/loader';

const LocationAllPage = () => {
  const [locations, setLocations] = useState([]);
  const [pageLocations, setPageLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [locationsEnded, setLocationsEnded] = useState(false);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const onLocationsLoaded = (newLocationsList) => {
    let ended = false;
    if (newLocationsList.length < 19) {
      ended = true;
    }
    setPageLocations([...pageLocations, ...newLocationsList]);
    setNewItemLoading(false);
    setPage(page + 1);
    setLocationsEnded(ended);
  };

  const onLocationsListLoading = () => {
    setNewItemLoading(true);
  };

  const onError = () => {
    setErr(true);
    setLoading(false);
  };

  const onRequest = (pageNum, initial) => {
    onLocationsListLoading();
    // eslint-disable-next-line no-unused-expressions
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    api.getPageLocations(pageNum).then(onLocationsLoaded);
  };

  const onAllLocationsLoading = (res) => {
    setLocations(res);
    setLoading(false);
  };

  useEffect(() => {
    api.getAllLocations().then(onAllLocationsLoading).catch(onError);
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

  if (err) {
    return <Error />;
  }

  if (loading && !err) {
    return <Loader />;
  }

  return (
    <Layout
      title='Locations'
      desc={` A total of ${locations.length} locations. ${pageLocations.length} locations shown`}
    >
      <div className={s.app_panel}>
        <SearchPanel className={s.search} onUpdateSearch={onUpdateSearch} />
      </div>
      {locations.length !== 0 && term.length === 0 ? (
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
            className={cn(s.load, { [s.btn]: locationsEnded })}
            disabled={newItemLoading}
            label='Load More'
            onClick={() => onRequest(page)}
          />
        </div>
      ) : (
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
      )}
    </Layout>
  );
};

export default LocationAllPage;
