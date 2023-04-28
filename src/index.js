import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchValue = e.target.value.trim();
  if (!searchValue) {
    countriesList.innerHTML = '';
    countryContainer.innerHTML = '';

    return;
  }

  fetchCountries(searchValue)
    .then(response => {
      filterInformation(response, response.length);
    })
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countriesList.innerHTML = '';
      countryContainer.innerHTML = '';
    });
}

function filterInformation(countriesArr, number) {
  if (number > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
    countryContainer.innerHTML = '';
    countriesList.innerHTML = '';

    return;
  } else if (number > 2 && number <= 10) {
    countryContainer.innerHTML = '';
    countriesList.innerHTML = countriesArr
      .map(({ name: { common }, flags: { svg } }) => {
        return `<li class ="flag-name"><img src="${svg}" alt="${common}" width = 25 height = 15 /><h2>${common}</h2></li>`;
      })
      .join('');

    return;
  }
  countriesList.innerHTML = '';
  countryContainer.innerHTML = createMarkup(countriesArr);
}

function createMarkup(countries) {
  return countries
    .map(
      ({
        name: { official },
        languages,
        population,
        flags: { svg },
        capital,
      }) => {
        return `<div class = "flex-container"><img src="${svg}" alt="${official}" width = 25 height = 15 />
        <h2>${official}</h2></div>
        <p>capital: ${capital}</p>
        <p>population: ${population}</p>
        <p>languages: ${Object.values(languages)}</p>`;
      }
    )
    .join('');
}
