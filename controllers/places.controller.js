const axios = require("axios");

exports.findAll = (req, res) => {
  const placetype = req.query.placetype;
  const lat = Number(req.query.lat);
  const long = Number(req.query.long);
  const ray = Number(req.query.ray);

  const url = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["amenity"="${placetype}"](${
    lat - ray
  },${long - ray},${lat + ray},${long + ray}););out;>;out skel qt;`;

  console.log(url);

  axios({
    method: "get",
    url,
  })
    .then(function (response) {
      res.send(JSON.stringify(response.data.elements));
    })
    .catch(function (error) {
      console.log(error);
    });
};
