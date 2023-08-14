function getLSValue(key) {
  return localStorage.getItem(key);
}

function setSessionID(key, value) {
  localStorage.setItem(key, value);
}

export { getLSValue, setSessionID };
