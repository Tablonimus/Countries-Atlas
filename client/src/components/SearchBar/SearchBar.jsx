import React from "react";
import styles from "./searchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCountriesByName,
  clearPage,
  getAllCountries,
} from "../../redux/actions";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const allCountries = useSelector((state) => state.allCountries);
  const getCountryNow = async () => dispatch(getCountriesByName(name));

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    getCountryNow(name);
    // if(!name) alert("Must Insert a valid country")
    dispatch(clearPage());
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getCountryNow(name);
    if (dispatch(getCountriesByName(!name))) {
      setName("");
      dispatch(getAllCountries())
      clearPage();
      alert("Must Insert a valid country");
    } else {
      dispatch(getCountriesByName(name));
    }
  }

  return (
    <form className="searchbutton" onSubmit={(e) => handleSubmit(e)}>
      <input
        className="filterbutton"
        list="Country"
        id="name"
        type="text"
        placeholder="Search Countries..."
        autoComplete="on"
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <datalist id="Country">
        {allCountries.map((country) => {
          return (
            <option
              value={country.name === undefined ? allCountries : country.name}
            />
          );
        })}
      </datalist>
      <button
        className="filterbutton"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </form>
  );
}
