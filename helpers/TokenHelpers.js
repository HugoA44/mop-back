const jwt = require("jsonwebtoken");
const extractIdfromRequestAuthHeader = (req) => {
  const authorization = req.headers["x-access-token"];
  console.log(jwt.decode(req.headers["x-access-token"]));
  if (authorization) {
    return jwt.decode(authorization).id;
  }
};

module.exports = {
  extractIdfromRequestAuthHeader,
};
