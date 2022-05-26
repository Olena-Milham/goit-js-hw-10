import './css/styles.css';
import debounce from 'lodash.debounce';
import CountryApiService from './fetchCountries';

// make exemplar, copy of our class to get {} with methods and properties
const countryApiService = new CountryApiService();

import countryInfoTpl from './templates/country-info.hbs';
import countryListTpl from './templates/country-list.hbs';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// here is work with interface
// and do fetch on input
//we call a class method fetchCountries from {}countryApiService
// with countryApiService.fetchCountries(inputSearch);
function onSearch(e) {
  //  by this line we used setter and wrote down value into property this.inputSearch on {} countryapiservice
  // and we don't need to pass this parameter into a function lower..
  countryApiService.search = e.target.value.trim();
  if (countryApiService.search === '') {
    clearMarkup();
    return;
  }
  countryApiService.fetchCountries().then(countries => {
    clearMarkup();
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    } else if (countries.length > 1) {
      clearMarkup();
      appendCountriesListMarkup(countries);
      return;
    }
    clearMarkup();
    appendCountriesInfoMarkup(countries);
    return;
  });
  // .catch(error => error);
}

function appendCountriesListMarkup(countries) {
  refs.countryList.insertAdjacentHTML('beforeend', countryListTpl(countries));
}

function appendCountriesInfoMarkup(countries) {
  refs.countryInfo.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
}

function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
