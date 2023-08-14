const BASE_URL = 'https://api.themoviedb.org/3';

const GENRES_URL = `${BASE_URL}/genre/movie/list`;
const GUEST_SESSION_URL = `${BASE_URL}/authentication/guest_session/new`;

const POPULAR_FILMS_URL = `${BASE_URL}/movie/popular`; /* ?language=en-US&page=${popularPage} */
const IMAGES_URL = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie`; /* ?query=${value}&page=${searchPage} */

const SET_RATE_URL = `${BASE_URL}/movie`;

export { GENRES_URL, GUEST_SESSION_URL, POPULAR_FILMS_URL, IMAGES_URL, SEARCH_MOVIE_URL, SET_RATE_URL };
