import React, { useState, useContext } from 'react';
import { Menu } from 'antd';

import { Context } from './context';

/* import { getRatedFilms } from '../services/service'; */

function Buttons({ setOnRate }) {
  const [current, setCurrent] = useState('search');
  const { resultFilms, setTotalPage } = useContext(Context);

  const onChangeTab = (e) => {
    if (e.key === 'rated') {
      setOnRate(true);
      setTotalPage(resultFilms.length);
    } else setOnRate(false);
    console.log('click ', e.key);
    /* setCurrentPage('1'); */
    setCurrent(e.key);
  };

  const items = [
    {
      label: 'Search',
      key: 'search',
      icon: '',
    },
    {
      label: 'Rated',
      key: 'rated',
      icon: '',
    },
  ];
  return (
    <Menu className="menu_buttons" onClick={onChangeTab} selectedKeys={[current]} mode="horizontal" items={items} />
  );
}

export default Buttons;
