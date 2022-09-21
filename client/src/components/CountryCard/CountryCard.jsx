import React from "react";
import { Link } from "react-router-dom";
import "./countryCardStyles.css";

export default function CountryCard(props) {
  var name =
    props.name.length >= 20 ? props.name.slice(0, 13) + "..." : props.name;
  return (
      <Link to={`/countries/${props.id}`}>
    <div className="countryCard">

        <img src={props.flags} alt="Loading" width="150px" height="100px" />
      
      <h3 className="hname">{name}</h3>
      <h3 className="hregion">{props.region}</h3>
    </div>
      </Link>
      
  );
}
