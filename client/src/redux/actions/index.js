import * as actions from "./Actions";
import axios from "axios";

export const getAllCountries = () => (dispatch) => {
  //↑con constante hecho↑
  return axios
    .get("http://localhost:3001/countries")
    .then((json) =>
      dispatch({ type: actions.GET_ALL_COUNTRIES, payload: json.data })
    )
    .catch((error) => console.log(error));
};
export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
        type: actions.GET_COUNTRIES_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "I can insert somthng here?");
    }
  };
}
export function getCountryDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_COUNTRY_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}

export function orderAtoZ(payload) {
  return {
    type: actions.ORDER_A_TO_Z,
    payload,
  };
}
export function clearPage(payload) {
  return {
    type: actions.CLEAR_STATE,
    payload,
  };
}
export function orderByContinents(payload) {
  return {
    type: actions.FILTER_BY_CONTINENTS,
    payload,
  };
}
//////////////////////ACTIVITIES/////////////////////////////////
export function orderByActivities(payload) {
  return {
    type: actions.FILTER_BY_ACTIVITY,
    payload,
  };
}
export const createActivity = (input) => async (dispatch) => {
  console.log(input, "input");
  const newActivity = {
    name: input.name,
    duration: input.duration,
    difficulty: input.difficulty,
    season: input.season[0],
    countries: input.countries,
  };
 
  return await axios
    .post("http://localhost:3001/activities", newActivity)
    .then((json) => {
      dispatch({
        type: actions.CREATE_ACTIVITY,
        payload: json.data,
      }).catch(error=>console.log("actividad malcriada"));
      
    });
};
export const getActivities = () => (dispatch) => {
  
  return axios
    .get("http://localhost:3001/activities")
    .then((json) =>
      dispatch({
        type: actions.GET_ALL_ACTIVITIES,
        payload: json.data,
      })
    )
    .catch((error) => console.log(error));
};
