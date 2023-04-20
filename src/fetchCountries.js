function fetchCountries(name) {
  const URl = `https://restcountries.com/v3.1/name/${name}?field=name,capital,languages,flags,population`;
  return fetch(URl).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchCountries };
