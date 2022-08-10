import React, { useState } from 'react';
import cn from 'classnames';
import s from './search-panel.module.scss';

const SearchPanel = ({ onUpdateSearch, className }) => {
  const [term, setTerm] = useState('');
  const onChangeValue = (e) => {
    const val = e.target.value;
    setTerm(val);
    onUpdateSearch(val);
  };
  return (
    <div className={cn(s.search_panel, className)}>
      <i className={cn('fas fa-magnifying-glass', s.search_icon)} />
      <input
        type='text'
        className={cn('form-control', s.input)}
        placeholder='Name'
        value={term}
        onChange={onChangeValue}
      />
    </div>
  );
};

export default SearchPanel;
