import './App.css';

import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import { getResources, getGuestSession } from './services/service';
import { getLSValue, setSessionID } from './services/LSservice';
import { Context } from './components/context';
import { GENRES_URL, GUEST_SESSION_URL, POPULAR_FILMS_URL, IMAGES_URL, SEARCH_MOVIE_URL } from './services/constants';

function App() {
  const [loading, setLoad] = useState(true);
  const [resultFilms, setResultFilms] = useState([]);
  const [searchPage, setSearchPage] = useState('1');
  const [popularPage, setPopularPage] = useState('1');
  const [value, setValue] = useState('');
  const [totalPage, setTotalPage] = useState();
  const [genres, setGenres] = useState([]);
  const [onRate, setOnRate] = useState(false);
  const [click, setClick] = useState(true);

  const getRatedFilms = getLSValue('ratedFilms');

  function getFilms(url, ratedFilms) {
    console.log(click);
    getResources(url, setLoad).then((body) => {
      const newArray = body.results.map((film) => {
        if (ratedFilms) {
          const ratedFilm = ratedFilms.find((rateFilm) => rateFilm.id === film.id);
          return ratedFilm
            ? { ...film, rate_count: ratedFilm.rate_count, rated: ratedFilm.rated }
            : { ...film, rate_count: 0, rated: false };
        }
        return { ...film, rate_count: 0, rated: false };
      });
      setResultFilms(newArray);
      setTotalPage(body.total_results);
    });
  }

  useEffect(() => {
    const popularFilmsURL = new URL(POPULAR_FILMS_URL);
    popularFilmsURL.searchParams.append('language', 'en-US');
    popularFilmsURL.searchParams.append('page', `${popularPage}`);

    const searchFilmsURL = new URL(SEARCH_MOVIE_URL);
    searchFilmsURL.searchParams.append('query', `${value}`);
    searchFilmsURL.searchParams.append('page', `${searchPage}`);

    const ratedFilms = JSON.parse(getRatedFilms);

    if (!onRate) {
      setLoad(true);
      // eslint-disable-next-line no-unused-expressions
      value ? getFilms(searchFilmsURL.toString(), ratedFilms) : getFilms(popularFilmsURL.toString(), ratedFilms);
      if (genres.length === 0) {
        getResources(GENRES_URL).then((body) => {
          setGenres(body.genres);
        });
      }
    }
  }, [value, onRate, popularPage, searchPage]);

  useEffect(() => {
    if (!getLSValue('guestID')) {
      getGuestSession(GUEST_SESSION_URL).then((guestID) => setSessionID('guestID', guestID));
    }
  }, []);

  const onChangePagination = (page) => {
    if (value) {
      setSearchPage(page);
      setPopularPage('1');
    }
    if (!value) {
      setPopularPage(page);
      setSearchPage('1');
    }
  };

  const debounceSearch = useCallback(
    debounce((value) => {
      setValue(value);
      setSearchPage('1');
      if (!value.trim()) {
        setSearchPage('1');
      }
    }, 300),
    []
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ genres, resultFilms, setTotalPage, setClick }}>
      <div className="container">
        <Header
          searchFilm={setValue}
          value={value}
          debounce={debounceSearch}
          setLoad={setLoad}
          onRate={onRate}
          setOnRate={setOnRate}
        />
        <div className="App">
          <Card
            resultFilms={resultFilms}
            setResultFilms={setResultFilms}
            urlImages={IMAGES_URL}
            loading={loading}
            onRate={onRate}
            getRatedFilms={getRatedFilms}
          />
        </div>
        <Footer
          onChangePagination={onChangePagination}
          resultFilms={resultFilms}
          totalPage={totalPage}
          value={value}
          popularPage={popularPage}
          searchPage={searchPage}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
