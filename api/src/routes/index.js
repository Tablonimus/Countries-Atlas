const { Router } = require("express");

const countryRoutes = require("./countryRoutes");
const activityRoutes = require("./activityRoutes")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send("GET de prueba / sola");
});


router.use("/countries", countryRoutes);
router.use("/activities",activityRoutes)




module.exports = router;
