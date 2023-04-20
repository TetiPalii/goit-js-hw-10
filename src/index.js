import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');

searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  if (e.target.value === '') {
  }

  fetchCountries(e.target.value)
    .then(response => {
      countriesList.innerHTML = createMarkup(response);
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        name: { official },
        languages,
        population,
        flags: { svg },
        capital,
      }) => {
        console.log(languages);
        console.log(official);
        return `<li>
        <h2>${official}</h2>
        <p>${capital}</p>
        <p>${population}</p>
        <p>${languages}</p>
        <img src="${svg}" alt="${official}" />
        
      </li>`;
      }
    )
    .join('');
}
