module.exports = app => {
  const places = require("../controllers/places.controller.js");

  const router = require("express").Router();

  // Find places
  router.get("/", places.findAll);
app.use('/api/places', router);
};