module.exports = (sequelize, Sequelize) => {
  const Travel = sequelize.define("travels", {
    longitude: {
      type: Sequelize.DECIMAL(11, 8),
    },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
    },
    time: {
      type: Sequelize.FLOAT,
    },
    journey: {
      type: Sequelize.JSON,
    },
  });
  return Travel;
};
