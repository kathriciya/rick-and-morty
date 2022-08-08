import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import s from './character-item.module.scss';
import api from '../../api/api';

const Character = ({ linkToCharacter }) => {
  const [person, setPerson] = useState({});
  const selectedId = linkToCharacter.match(/\d+$/);
  const personId = selectedId[0];

  useEffect(() => {
    api.getCharacter(personId).then((res) => {
      setPerson(res);
    });
  }, [personId]);

  return (
    <li
      className={cn(
        'list-group-item d-flex flex-column flex-wrap justify-content-center align-items-center',
        s.character_item
      )}
    >
      <Link className={s.link} to={`character/${personId}`}>
        <img className={s.character_img} src={person.image} alt='character' />
        <span className={s.character_name}>{person.name}</span>
      </Link>
    </li>
  );
};

export default Character;
