//IMPORT//
import React, { Fragment } from "react";
//IMPORT HOOKS//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//GET ACTIONS//
import {
  getAllCountries,
  orderAtoZ,
  getActivities,
  orderByActivities,
  clearPage,
} from "../../redux/actions";
import { orderByContinents } from "../../redux/actions";
//GET COMPONENTS//
import CountryCard from "../CountryCard/CountryCard";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
//GET STYLES//
import styles from "./homeStyles.css";

////////////////////////////EXPORT COMPONENT///////////////////////////
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  const allCountries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  const allActivities = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }

  function handleOrderByContinent(e) {
    //e.preventDefault()  HOJALDREEEEEEE!!!!!!!!
    dispatch(orderByContinents(e.target.value));
    setCurrentPage(1)
  }

  function handleOrderAZ(e) {
    e.preventDefault();

    dispatch(orderAtoZ(e.target.value));

    setCurrentPage(1);
  }
  function handleOrderByActivities(e) {
    e.preventDefault();
    console.log(e.target.value, "E.T.V");
    dispatch(orderByActivities(e.target.value));
    setCurrentPage(1);
  }

  return (
    <>
      <h1 className="title">Search for activities around the world</h1>
      <div className="transparentdivcountries">
      <div className="filters">
        <div className="orderfilters">
          <div className="searchbar">
            <SearchBar />
          </div>
          <nav className="filtersNav">
            <select
              className="filterbutton"
              onChange={(e) => handleOrderByContinent(e)}
            >
              <option value="All">All Regions</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctic">Antarctic</option>
            </select>
            <select className="filterbutton" onChange={(e) => handleOrderAZ(e)}>
              <option value="none">Sort All...</option>
              <option value="ascendent">...A to Z</option>
              <option value="descendent">...Z to A</option>
              <option value="ascendentPopulation">...Higher Population</option>
              <option value="descendentPopulation">...Lower Population</option>
            </select>
            <select
              className="filterbutton"
              onChange={(e) => handleOrderByActivities(e)}
            >
              <option value="All">Filter By Activities</option>
              {allActivities.map((activities) => {
                return (
                  <option value={activities.name.toLowerCase()}>
                    {activities.name}
                  </option>
                );
              })}
            </select>
          </nav>
        </div>
        <Link to={"/activities"}>
          <button className="activitiesbutton">Add New Activities</button>
        </Link>
      </div>
</div>
      <hr />

      <div className="transparentdivcountries">
        <div className="orderCountryCard">
          {currentCountries.map((country) => {
            return (
              <Fragment>
                <CountryCard
                  id={country.id}
                  name={country.name}
                  flags={country.flags}
                  region={country.region}
                  capital={country.capital}
                  subregion={country.subregion}
                  area={country.area}
                  population={country.population}
                  activities={country.Activities}
                  map={country.map}
                />
              </Fragment>
            );
          })}
        </div>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
        />
      </div>
      <button
        className="filterbutton"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh
      </button>
      <hr />
      <div className="pagination">
      
      </div>
      <footer>Made With Love by Tablonimus</footer>
    </>
  );
}
