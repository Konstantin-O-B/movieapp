const userKey = process.env.REACT_APP_API_TOKEN;

const GEToptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${userKey}`,
  },
};

// eslint-disable-next-line consistent-return
export async function getResources(url, setLoad) {
  try {
    console.log(userKey);
    const res = await fetch(url, GEToptions);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const body = await res.json();
    if (setLoad) {
      setLoad(false);
    }
    /* console.log(body); */
    return body;
  } catch (err) {
    alert(err);
  }
}

// eslint-disable-next-line consistent-return
export async function getGuestSession(url) {
  try {
    const res = await fetch(url, GEToptions);
    const body = await res.json();
    const guestID = body.guest_session_id;
    console.log(guestID);
    return guestID;
  } catch (err) {
    alert(err);
  }
}

// eslint-disable-next-line consistent-return
export async function setRateOnFilmRequest(url, rate) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${userKey}`,
    },
    body: `{"value":${rate}}`,
  };

  try {
    const res = await fetch(url, options);
    const body = await res.json();
    /* console.log(url, id, rate); */
    return console.log(body);
  } catch (err) {
    alert(err);
  }
}

// eslint-disable-next-line consistent-return
/* export async function getRatedFilms() {
  const url = `https://api.themoviedb.org/3/guest_session/dd99ef54c8cd6d3e4bc4887bb6b7d3de/rated/movies?api_key=${userKey}&page=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const body = await res.json();
    console.log(body);
    return body;
  } catch (err) {
    alert(err);
  }
} */
