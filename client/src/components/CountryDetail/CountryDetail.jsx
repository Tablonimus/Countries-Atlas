import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPage, getCountryDetail } from "../../redux/actions";
import styles from "./detailStyles.css";
import populationIcon from "../../assets/images/population.jpg";
import areaIcon from "../../assets/images/mapicon.png";
/////////////////////////FUNCTIONAL COMPONENT////////////////////
export default function CountryDetail(props) {
  const dispatch = useDispatch();

  const countryDetail = useSelector((state) => state.countryDetail);
  console.log(countryDetail, "COUNTRY DETAIL");

  const activities = countryDetail.Activities;

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
    return () => dispatch(clearPage());
  }, [dispatch, props.match.params.id]);

  function handleClick() {
    dispatch(clearPage());
  }

  return (
    <>
      <Link to={"/countries"} onClick={() => handleClick()}>
        <button className="filterbutton">Back to HomePage</button>
      </Link>

      <div className="infocontainer">
        <div className="transparentdivisorflag">
          <div className="countryDetails">
            <div className="contentNameFlag">
              <div className="titleflag">
                {" "}
                {countryDetail.name < 20 ? (
                  <>
                    <h1 className="titlefont">({countryDetail.id}) </h1>
                    <h1 className="titlefont"> {countryDetail.name}</h1>
                  </>
                ) : (
                  <>
                    <h1 className="titlefontBIG">({countryDetail.id}) </h1>
                    <h1 className="titlefontBIG"> {countryDetail.name}</h1>
                  </>
                )}
              </div>

              <img
                className="imageFlag"
                src={countryDetail.flags}
                alt="Loading"
                width="415em"
                height="215em"
              />
              <h2 className="detailsfont">Continent: {countryDetail.region}</h2>
              <h2 className="detailsfont">
                Sub-Region: {countryDetail.subregion}
              </h2>
              <h2 className="detailsfont">Capital: {countryDetail.capital}</h2>
            </div>
          </div>
        </div>

        <div className="iconsector">
          <div className="transparentdivisor">
            <div className="details">
              <h2 className="detailsfont"> Population</h2>
              <img
                src={populationIcon}
                className="populationIcon"
                height="40%"
                width="50%"
              />
              <h2 className="detailsfont">{countryDetail.population}</h2>
            </div>
          </div>

          <div className="transparentdivisor">
            <div className="details">
              <a target="_blank" href={countryDetail.map}>
                <h2 className="detailsfont">Click to Search Map</h2>
                <img className="mapIcon" src={areaIcon} height="15%" />
                <h2 className="detailsfont">
                  Area: {countryDetail.area / 1000000} Millions km2
                </h2>
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <h2 className="activitiesdetail">Activities to Do:</h2>

      <div className="activities">
        {activities?.length ? (
          countryDetail.Activities?.map((act, k) => {
            return (
              <div key={k} className="transparentdivisor">
                <div className="details">
                  <h2 className="titlefont">{act.name}</h2>
                  <h2 className="activitiesdetail">Duration: {act.duration}</h2>
                  <h2 className="activitiesdetail">
                    Difficulty: {act.difficulty} stars
                  </h2>
                  <h2 className="activitiesdetail">Season: {act.season}</h2>
                </div>
              </div>
            );
          })
        ) : (
          //  TERNARIO DEL MISTERIO- BOTON!!!!
          <div className="emptymessagediv">
            <Link to="/activities">
              <button className="filterbutton">
                {" "}
                <h1 className="emptymessage">
                  {"  "}
                  -This country has no added activities yet-
                </h1>{" "}
                <h1> Go to create →</h1>{" "}
              </button>
            </Link>
          </div>
        )}
      </div>
      <footer>Made With Love by Tablonimus</footer>
    </>
  );
}
