const { extractIdfromRequestAuthHeader } = require("../helpers/TokenHelpers");
const db = require("../models");
const { getTravel } = require("../utils/getTravel");

const Travels = db.travel;

exports.create = async (req, res) => {
  const userId = extractIdfromRequestAuthHeader(req);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Req can not be empty!",
    });
    return;
  }
  console.log(req.body);
  getTravel(
    req.body.placetype,
    req.body.latitude,
    req.body.longitude,
    req.body.ray
  )
    .then(async (data) => {
      const travel = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        time: req.body.time,
        journey: data,
        userId,
      };
      // Save Travel in the database
      await Travels.create(travel)
        .then((data) => {
          Travels.findOne({
            where: {
              id: data.id,
            },
          }).then((data) => {
            res.send(data);
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Travel.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Travel.",
      });
    });
};

exports.findAll = (req, res) => {
  const userId = extractIdfromRequestAuthHeader(req);

  Travels.findAll({ where: userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving travels.",
      });
    });
};
