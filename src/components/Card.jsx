/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useContext } from 'react';
import { Image, Rate, Spin, Alert } from 'antd';
import { format, parseISO } from 'date-fns';
import { SyncOutlined } from '@ant-design/icons';

import { setRateOnFilmRequest } from '../services/service';
import { getLSValue } from '../services/LSservice';
import { SET_RATE_URL } from '../services/constants';

import { Context } from './context';
import RateCount from './rate/RateCount';
import Genres from './genres/Genres';

const antIcon = (
  <SyncOutlined
    style={{
      fontSize: 100,
      color: '#FFA500',
    }}
    spin
  />
);

function shorten(str, maxLen, type, separator = ' ') {
  if (type === 'description') {
    if (str.length <= maxLen) return str;
    return `${str.substring(0, str.lastIndexOf(separator, maxLen))} ... `;
  }
  if (str.length <= maxLen) return str;
  return `${str.substring(0, str.lastIndexOf(separator, maxLen))} ... `;
}

function Card({ resultFilms, setResultFilms, urlImages, onRate, getRatedFilms, loading }) {
  const [ratedFilms, setRatedFilms] = useState(getRatedFilms ? JSON.parse(getRatedFilms) : []);
  const { setClick } = useContext(Context);

  useEffect(() => {
    if (ratedFilms.length > 0) {
      localStorage.setItem('ratedFilms', JSON.stringify(ratedFilms));
    }
  }, [ratedFilms]);

  const setRateOnFilm = (item, value) => {
    const updatedFilm = { ...item, rate_count: value };
    if (ratedFilms.length !== 0) {
      const updateFilms = ratedFilms.map((film) => (film.id === item.id ? { ...film, rate_count: value } : film));
      const existingFilm = updateFilms.find((film) => film.id === item.id);
      if (existingFilm) {
        setRatedFilms(updateFilms);
      } else {
        setRatedFilms([...updateFilms, updatedFilm]);
      }
    } else {
      setRatedFilms([...ratedFilms, updatedFilm]);
    }
    const updatedResultFilms = resultFilms.map((film) => (film.id === item.id ? updatedFilm : film));
    setResultFilms(updatedResultFilms);
  };

  useEffect(() => {
    if (onRate) {
      setResultFilms(ratedFilms);
    }
  }, [onRate, ratedFilms]);

  const setRateURL = (id) => {
    const rateURL = new URL(`movie/${id}/rating`, SET_RATE_URL);
    rateURL.searchParams.append('guest_session_id', `${getLSValue('guestID')}`);
    /* console.log(rateURL.toString()); */
    return rateURL.toString();
  };

  if (!navigator.onLine) {
    return (
      <Alert
        message="Connection is lost.."
        banner
        style={{
          width: '90%',
        }}
      />
    );
  }

  if (loading) {
    return <Spin className="spin" indicator={antIcon} />;
  }

  if (resultFilms.length === 0) {
    return (
      <div className="nodata">
        <h1>Movies not found :(</h1>
      </div>
    );
  }
  return resultFilms.map((item) => (
    <div className="app_card" key={item.id}>
      <Image className="image" src={urlImages + item.poster_path} />
      <div className="card_container__right">
        <RateCount rate={item.vote_average} />
        <title>{item.title ? shorten(item.title, 35) : 'Title not found'}</title>
        <span className="card_date">
          {item.release_date ? format(parseISO(item.release_date), 'MMMM d, y') : 'Date not found'}
        </span>
        <div className="genre_container">
          <Genres item={item} />
        </div>
        <span className="card_description">
          {item.overview ? shorten(item.overview, 203, 'description') : 'Description not found'}
        </span>
        <Rate
          className="card_rate"
          allowHalf
          count={10}
          onChange={(value) => {
            setRateOnFilm(item, value);
            setRateOnFilmRequest(setRateURL(item.id), value);
            setClick((prev) => !prev);
          }}
          value={item.rate_count}
        />
      </div>
    </div>
  ));
}

export default Card;
