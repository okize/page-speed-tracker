module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    url: DataTypes.STRING,
    strategy: DataTypes.STRING,
    score: DataTypes.INTEGER
  });

  return Score;
};
