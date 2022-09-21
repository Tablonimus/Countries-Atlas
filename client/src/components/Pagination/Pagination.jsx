import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./paginationStyles.css";

export default function Pagination({
  countriesPerPage,
  allCountries,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers?.map((number) => (
          <a className="number" key={number}>
            <button
              className="paginationbutton"
              onClick={() => pagination(number)}
            >
              {number}
            </button>
          </a>
        ))}
      </ul>
    </nav>
  );
}
