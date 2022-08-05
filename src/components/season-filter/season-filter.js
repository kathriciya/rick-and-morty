import React from 'react';
import cn from 'classnames';
import s from './season-filter.module.scss';

const SeasonFilter = ({ filter, onFilterSelect }) => {
  const buttonsData = [
    { name: 'Season 1', label: 'Season 1' },
    { name: 'Season 2', label: 'Season 2' },
    { name: 'Season 3', label: 'Season 3' },
    { name: 'Season 4', label: 'Season 4' },
    { name: 'Season 5', label: 'Season 5' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const clazz = active ? 'btn-light' : 'btn-outline-light';
    return (
      <button
        type='button'
        className={cn(`btn ${clazz}`, s.button)}
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
