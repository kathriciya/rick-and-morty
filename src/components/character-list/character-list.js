import React from 'react';
import cn from 'classnames';
import s from './character-list.module.scss';
import Character from '../character-item/character-item';

const CharacterList = ({ episode }) => {
  const elements = episode.characters.map((item, i) => (
    <Character key={i} linkToCharacter={item} />
  ));
  return (
    <div className={s.character_list_wrap}>
      <ul className={cn('list-group', s.list)}>{elements}</ul>
    </div>
  );
};

export default CharacterList;
