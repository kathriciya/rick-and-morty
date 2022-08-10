import React from 'react';
import cn from 'classnames';
import s from './character-list.module.scss';
import Character from '../character-item/character-item';

const CharacterList = ({ episode, location }) => {
  // const elements = episode.characters.map((item, i) => (
  //   <Character key={i} linkToCharacter={item} />
  // ));
  return (
    <div className={s.character_list_wrap}>
      <ul className={cn('list-group', s.list)}>
        {episode &&
          episode.characters.map((item, i) => (
            <Character key={i} linkToCharacter={item} />
          ))}
        {location &&
          location.residents.map((item, i) => (
            <Character key={i} linkToCharacter={item} />
          ))}
      </ul>
    </div>
  );
};

export default CharacterList;
