const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  createActivity,
  getAllActivities,
} = require("../controllers/activityControl");
const axios = require("axios");
const router = Router();

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const activities = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    res.status(201).json(activities);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(201).json(activities);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
