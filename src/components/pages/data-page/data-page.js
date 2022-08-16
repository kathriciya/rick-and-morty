import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './data-page.module.scss';
import Layout from '../../layout/layout';
import api from '../../../api/api';
import SearchPanel from '../../search-panel/search-panel';
import Button from '../../button/button';
import Error from '../../error-message/error-message';
import Loader from '../../loader/loader';

const DataPage = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [dataEnded, setDataEnded] = useState(false);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const onDataLoaded = (newDataList) => {
    let ended = false;
    if (newDataList.length < 19) {
      ended = true;
    }
    setPageData([...pageData, ...newDataList]);
    setLoading(false);
    setNewItemLoading(false);
    setPage(page + 1);
    setDataEnded(ended);
  };

  const onDataListLoading = () => {
    setNewItemLoading(true);
  };

  const onError = () => {
    setErr(true);
    setLoading(false);
  };

  const onRequest = (pageNum, initial) => {
    onDataListLoading();
    // eslint-disable-next-line no-unused-expressions
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    if (dataType === 'locations') {
      api.getPageLocations(pageNum).then(onDataLoaded).catch(onError);
    } else if (dataType === 'characters') {
      api.getPageCharacters(pageNum).then(onDataLoaded).catch(onError);
    }
  };
  const onAllDataLoading = (res) => {
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    if (dataType === 'locations') {
      api.getAllLocations().then(onAllDataLoading).catch(onError);
    } else if (dataType === 'characters') {
      api.getAllCharacters().then(onAllDataLoading).catch(onError);
    }
  }, [dataType]);

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

  const visibleData = searchEmp(data, term);

  if (err) {
    return <Error />;
  }

  if (loading && !err) {
    return <Loader />;
  }

  const value = dataType === 'locations' ? 'location' : 'character';
  const title = dataType === 'locations' ? 'Locations' : 'Characters';

  return (
    <Layout
      title={title}
      desc={` A total of ${data.length} ${value}s. ${pageData.length} ${value}s shown`}
    >
      <div className={s.app_panel}>
        <SearchPanel className={s.search} onUpdateSearch={onUpdateSearch} />
      </div>
      {data.length !== 0 && term.length === 0 ? (
        <div>
          <ul className={s.list}>
            {pageData.map((item) => {
              return (
                <li key={item.id} name={item.name} className={s.item}>
                  <Link className={s.link} to={`/${value}/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            className={s.load}
            disabled={newItemLoading}
            style={{ display: dataEnded ? 'none' : 'block' }}
            label='Load More'
            onClick={() => onRequest(page)}
          />
        </div>
      ) : (
        <ul className={s.list}>
          {visibleData.map((item) => {
            return (
              <li key={item.id} name={item.name} className={s.item}>
                <Link className={s.link} to={`/${value}/${item.id}`}>
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

export default DataPage;
