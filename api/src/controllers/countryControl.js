//////////////COUNTRY CONTROLLERS///////////////////

const axios = require("axios");
const { Activity, Country } = require("../db");
require("dotenv").config();

//////////////GET API INFO////////////////
//GET API DATA//////////////
async function getApiCountries() {
  const apiData = await axios.get("https://restcountries.com/v3/all");
  console.log("The api data is ready to map...");
  //FORMAT DATA///////////
  const apiCountry = await Promise.all(
    apiData.data.map(async (country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flags: country.flags[0],
        region: country.region,
        capital: country.capital ? country.capital[0] : "No capital",
        subregion: country.subregion ? country.subregion : "No subregion",
        area: country.area,
        population: country.population,
        map: country.maps ? country.maps.googleMaps : "No map",
      };
    })
  );
  console.log("The Countries has been mapped succesfully");
  return apiCountry;
}
/////////////LOAD INFO TO DB//////////
async function loadCountries() {
  console.log("Filling DB...");
  const mappedCountries = await getApiCountries();
  await Country.bulkCreate(mappedCountries);
  console.log("The Countries has been loaded at local DB");
  console.log("Ready to run...");
}
////////////FIND ALL DB INFO///////
async function getAllCountries() {
  try {
    const dbCountries = await Country.findAll({
      include: {
        model: Activity,
        through: {
          attributes: [],
        },
      },
    });
    const jsonCountriesData = await Promise.all(
      dbCountries.map(async (country) => country.toJSON())
    );

    return jsonCountriesData;
  } catch (error) {
    throw new Error("getAllCountries controller error");
  }
}

////////////FIND COUNTRY INFO BY ID///////////////////
async function getInfoById(idCountry) {
  try {
    if (isNaN(idCountry) && idCountry.length === 3) {
      //If flama
      const upperCaseId = idCountry.toUpperCase();
      const getCountryInfo = await Country.findByPk(upperCaseId, {
        include: {
          model: Activity,
          through: {
            attributes: [],
          },
        },
      });

      return getCountryInfo;
    } else {
      throw new Error("Data must be a DataType.STRING(3)");
    }
  } catch (error) {
    throw new Error("getInfoById controller ERROR");
  }
}

////////////FIND COUNTRY BY QUERY REQ/////////CAMBIE LOGICA,EN VEZ DE === USE .INCLUDES(LAUTARO DID IT)
async function getCountriesByQuery(name) {
  const allCountries = await getAllCountries();
  const countriesRequested = [];
  if (name) {
    allCountries.map((country) => {
      if (country.name.toLowerCase().includes(name.toLowerCase())) {
        countriesRequested.push(country);
      }
    });
    if (!countriesRequested.length) {
      throw new Error("Incorrect Input Value ERROR");
    }
    return countriesRequested;
  } else return allCountries;
}

module.exports = {
  getApiCountries,
  loadCountries,
  getAllCountries,
  getInfoById,
  getCountriesByQuery,
};
