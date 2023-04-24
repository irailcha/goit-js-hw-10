import './css/styles.css';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

import _ from 'lodash';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById("search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


function resetResults() {
  countryList.innerHTML = "";
  countryInfo.innerHTML = "";
}

searchBox.addEventListener("input", _.debounce(async (event) => {
  const name = searchBox.value.trim();

  if (name.length < 1) {
    return;
  }

  const countries = await fetchCountries(name);
  loadCountries(countries);
}), DEBOUNCE_DELAY);

function loadCountries(countries) {
  resetResults();

  if (countries.length >= 2 && countries.length < 10) {
    countryList.innerHTML = countries.map(country => {
      const { flags: { svg } } = country;
      return `<li class="country">
      <div class="country-img" style="display: flex;align-items: center; gap: 15px;">
      <img src="${svg}" alt="${country.name}" style="width: 30px; height: 20px" />
      <h2 class="country-name">${country.name}</h2>
        </div>
      </li>`;
    }).join("");
  } else if (countries.length === 1) {
    
    const country = countries[0];
    const { flags: { svg } } = country;
    const countryHtml = `<li class="country">
      <div class="country-img" style="display: flex;align-items: center;gap: 15px;">
        <img src="${svg}" alt="${country.name}" style="width: 30px; height: 20px" />
        <h2 class="country-name">${country.name}</h2>
      </div>
    </li>`;
    const countryInfoHtml = `<p><span class="label">Population:</span> ${country.population}</p>
      <p><span class="label">Capital:</span> ${country.capital}</p>
      <p><span class="label">Languages:</span> ${country.languages.map(lang => lang.name).join(', ')}</p>`;
      countryList.innerHTML = countryHtml;
      countryInfo.innerHTML = countryInfoHtml;
  }
   else if (countries[0].name.length >=1 && countries.length >= 10) {
    Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
    
  } else {
    Notiflix.Notify.warning("Oops, there is no country with that name");
  }
}

