const axios = require("axios");

const getTravel = async (_placetype, _lat, _long, _ray) => {
  // const placetype = JSON.parse(_placetype);
  console.log("placetype", _placetype);
  const placetype = _placetype;
  const lat = Number(_lat);
  const long = Number(_long);
  const ray = Number(_ray);

  let parcours = [];

  const mapping = await Promise.all(
    placetype.map(async (type, index) => {
      const url = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(${type}(${
        lat - ray
      },${long - ray},${lat + ray},${long + ray}););out;>;out skel qt;`;

      await axios({
        method: "get",
        url,
      })
        .then(async function (response) {
          const places = response.data.elements;

          const selectedPlace =
            places[Math.floor(Math.random() * response.data.elements.length)];

          console.log("selectedPlace", selectedPlace);
          const travelUrl = `https://api.external.citymapper.com/api/1/traveltimes?start=${
            index > 0 ? parcours[index - 1][1].lat : lat
          },${index > 0 ? parcours[index - 1][1].lon : long}&end=${Number(
            selectedPlace.lat
          )},${Number(selectedPlace.lon)}`;

          await axios({
            method: "get",
            url: travelUrl,
            headers: {
              "Citymapper-Partner-Key": process.env.CITYMAPPER_API,
            },
          })
            .then(function (response) {
              parcours.push([response.data, selectedPlace]);
              console.log("parcours", parcours);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  );

  return parcours;
};

module.exports = {
  getTravel,
};
