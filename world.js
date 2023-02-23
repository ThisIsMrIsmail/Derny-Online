
const countries = require("country-state-city").Country;
const states = require("country-state-city").State;
// const cities = require("country-state-city").City;

// const allCountries = [];
// const allStates = [];
// const allCities = [];

const allCountries = countries.getAllCountries();
const allStates = states.getAllStates();

// for (let i=0; i<250; i++) {
//   allCountries[i] = countries.getAllCountries()[i].name;
// }
// for (let i=0; i<states.getStatesOfCountry("EG").length; i++) {
//   allStates[i] = states.getStatesOfCountry("EG")[i].name;
// }
// for (let i=0; i<cities.getCitiesOfState("EG", "C").length; i++) {
//   allCities[i] = cities.getCitiesOfState("EG", "C")[i].name;
// }

module.exports = {
  countries: function () {
    return allCountries;
  },
  states: function () {
    return allStates;
  },
  cities: function () {
    return allCities;
  },
}