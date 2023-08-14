import React from 'react';

import Buttons from './Buttons';
import Searching from './Searching';

function Header({ searchFilm, value, debounce, setLoad, onRate, setOnRate }) {
  return (
    <div className="header">
      <Buttons setOnRate={setOnRate} onRate={onRate} />
      {!onRate && <Searching searchFilm={searchFilm} debounce={debounce} setLoad={setLoad} value={value} />}
    </div>
  );
}

export default Header;
