const { Router } = require("express");
const sequelize = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllCountries,
  getInfoById,
  getCountriesByQuery,
} = require("../controllers/countryControl");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const getCountry = await getCountriesByQuery(name);
      res.status(201).json(getCountry);
    } else {
      const countries = await getAllCountries();
      res.status(201).json(countries);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:idCountry", async (req, res) => {
  const { idCountry } = req.params;
  try {
    const getCountry = await getInfoById(idCountry);
    res.status(201).json(getCountry);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
