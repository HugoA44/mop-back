const { authJwt } = require("../middleware");
const controller = require("../controllers/travel.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/travel", [authJwt.verifyToken], controller.create);

  app.get("/api/travel/:id", [authJwt.verifyToken], controller.findOne);
};
