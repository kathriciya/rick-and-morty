import React from 'react';
import cn from 'classnames';
import s from './season-filter.module.scss';

const SeasonFilter = ({ filter, onFilterSelect }) => {
  const buttonsData = [
    { name: 'S01', label: 'Season 1' },
    { name: 'S02', label: 'Season 2' },
    { name: 'S03', label: 'Season 3' },
    { name: 'S04', label: 'Season 4' },
    { name: 'S05', label: 'Season 5' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const clazz = active ? 'btn-light' : 'btn-outline-light';
    return (
      <button
        type='button'
        className={cn(`btn ${clazz}`, s.button, { [s.btn_color]: active })}
        key={name}
        onClick={() => onFilterSelect(name)}
      >
        {label}
      </button>
    );
  });

  return <div className={s.btn_group}>{buttons}</div>;
};

export default SeasonFilter;
