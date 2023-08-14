import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function Searching({ debounce }) {
  return (
    <Search
      placeholder="input search text"
      style={{
        width: '93%',
      }}
      onChange={(e) => {
        debounce(e.target.value);
      }}
    />
  );
}

export default Searching;
