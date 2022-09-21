import * as actions from "../actions/Actions";
import { GET_ALL_COUNTRIES } from "../actions/Actions";

const initialState = {
  allCountries: [], //GET_ALL_COUNTRIES - filter
  copyAllCountries: [], //copia para filtros
  activities: [], //When i create it fills

  countryDetail: [], //Detail Route
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        copyAllCountries: payload,
      };

    case actions.GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        allCountries: payload,
      };

    case actions.FILTER_BY_CONTINENTS:
      console.log(payload, "PAYLOAD");
      const allCountries = state.copyAllCountries;

      const filteredCountries =
        payload === "All"
          ? allCountries
          : allCountries.filter((elem) => elem.region === payload);
      console.log(filteredCountries, "aca van los filtrados");
      return {
        ...state,
        allCountries: filteredCountries,
      };

    case actions.FILTER_BY_ACTIVITY:
      const formatpayload = payload.toLowerCase();
     

      const countries = state.copyAllCountries;
      const activities = state.activities;


      const countryWithActivities = countries.filter((country) => {
        if (country.Activities.length) return country;
      });

      
      let countriesMatched = (formatpayload === "all"
      ? countries
      : countryWithActivities.filter((c) =>
      Object.values(
        c.Activities.map((a) => a.name.toLowerCase())
        ).includes(formatpayload)
        ));
        

        
        console.log(countriesMatched, "FINAL...");
      return {
        ...state,
        allCountries: countriesMatched,
      };

    case actions.GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload,
      };

    case actions.CLEAR_STATE:
      return {
        ...state,
        countryDetail: {},

      };

    case actions.ORDER_A_TO_Z:
      let orderCountries;
      if (payload === "ascendent") {
        orderCountries = [...state.allCountries].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
      } else if (payload === "descendent") {
        orderCountries = [...state.allCountries].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0;
        });
      } else if (payload === "descendentPopulation") {
        orderCountries = [...state.allCountries].sort((a, b) => {
          if (a.population > b.population) return 1;
          if (b.population > a.population) return -1;
          return 0;
        });
      } else if (payload === "ascendentPopulation") {
        orderCountries = [...state.allCountries].sort((a, b) => {
          if (a.population > b.population) return -1;
          if (b.population > a.population) return 1;
          return 0;
        });
      } else if (payload === "none") orderCountries = state.allCountries;
      return {
        ...state,
        allCountries: orderCountries,
      };

    case actions.CREATE_ACTIVITY:
      return {
        ...state,
        activities: payload,
      };

    case actions.GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };

    default:
      return { ...state };
  }
}
