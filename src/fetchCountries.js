import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class CountryApiService {
  constructor() {
    this.inputSearch = '';
  }
  // method responsible for https - fetchCountries()
  //  fetchCountries parameters are empty,
  //   because we have this.inputSearch, which we put into url as ${} to seach for what people want
  fetchCountries() {
    // console.log(this);
    const url = `https://restcountries.com/v3.1/name/${this.inputSearch}?fields=name,capital,population,flags,languages`;
    return fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(countries => {
        console.log(countries);
        return countries;
      })
      .catch(error => {
        // Error handling
        Notify.failure('Oops, there is no country with that name');
      });
  }

  // to write anything from outter code we make get & set
  get search() {
    return this.inputSearch;
  }
  set search(newSearch) {
    this.inputSearch = newSearch;
  }
}
