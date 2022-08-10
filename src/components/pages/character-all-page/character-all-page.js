import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './character-all-page.module.scss';
import Layout from '../../layout/layout';
import api from '../../../api/api';
import SearchPanel from '../../search-panel/search-panel';
import Button from '../../button/button';

const CharacterAllPage = () => {
  const [characters, setCharacters] = useState([]);
  const [pageCharacters, setPageCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [charactersEnded, setCharactersEnded] = useState(false);
  const [term, setTerm] = useState('');

  const onCharactersLoaded = (newCharactersList) => {
    let ended = false;
    if (newCharactersList.length < 19) {
      ended = true;
    }
    setPageCharacters([...pageCharacters, ...newCharactersList]);
    setnewItemLoading(false);
    setPage(page + 1);
    setCharactersEnded(ended);
  };

  const onRequest = (pageNum, initial) => {
    // eslint-disable-next-line no-unused-expressions
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    api.getPageCharacters(pageNum).then(onCharactersLoaded);
  };

  useEffect(() => {
    api.getAllCharacters().then((res) => setCharacters(res));
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

  const visibleCharacters = searchEmp(characters, term);

  return (
    <Layout
      title='Characters'
      desc={` A total of ${characters.length} characters. ${pageCharacters.length} characters shown`}
    >
      <div className={s.app_panel}>
        <SearchPanel className={s.search} onUpdateSearch={onUpdateSearch} />
      </div>
      {term.length > 0 ? (
        <ul className={s.list}>
          {visibleCharacters.map((item) => {
            return (
              <li key={item.id} name={item.name} className={s.item}>
                <Link className={s.link} to={`/character/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <ul className={s.list}>
            {pageCharacters.map((item) => {
              return (
                <li key={item.id} name={item.name} className={s.item}>
                  <Link className={s.link} to={`/character/${item.id}`}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            className={s.load}
            disabled={newItemLoading}
            style={{ display: charactersEnded ? 'none' : 'block' }}
            label='Load More'
            onClick={() => onRequest(page)}
          />
        </div>
      )}
    </Layout>
  );
};

export default CharacterAllPage;
