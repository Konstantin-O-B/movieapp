import React, { useContext, useEffect, useState } from 'react';
import { Tag } from 'antd';
import './Genres.css';

import { Context } from '../context';

function Genres({ item }) {
  const { genres } = useContext(Context);
  const [genresName, setGenresName] = useState(['genres not found']);

  const getGenres = () => {
    if (item.genre_ids.length !== 0) {
      const names = item.genre_ids.reduce((acc, id) => {
        const genre = genres.find((genre) => genre.id === id);
        if (genre) {
          acc.push(genre.name);
        }
        return acc;
      }, []);
      /* console.log(names); */
      setGenresName(names);
    }
  };

  useEffect(() => {
    getGenres();
  }, [genres, item.genre_ids]);

  return genresName.map((name) => (
    <Tag key={Date.now() + Math.random(1)} className="genreName">
      {name}
    </Tag>
  ));
}

export default Genres;
