const axios = require("axios");
const { Activity, Country } = require("../db");

////POST ACTIVITY CONTROLLER/////////////////
async function createActivity(name, difficulty, duration, season, countries) {
  if (!name || !difficulty || !duration || !season)
    throw new Error("Incorrect Data ERROR");
  console.log("Inputs are filled");

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  console.log(newActivity);
  if (countries[0] !== undefined) {
    const dBCountries = await Country.findAll({
      where: { name: countries },
    });
    newActivity.addCountry(dBCountries);
  }
  return `Actividad Creada Correctamente 👏👏👏`;
}

////////////FIND ALL DB INFO///////
async function getAllActivities() {
  try {
    const dbActivities = await Activity.findAll({
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });
    const jsonActivitiesData = await Promise.all(
      dbActivities.map(async (activity) => activity.toJSON())
    );

    return jsonActivitiesData;
  } catch (error) {
    throw new Error("getAllCountries controller error");
  }
}

module.exports = { createActivity , getAllActivities};
