'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tranc = sequelize.define('Tranc', {
    brdate: DataTypes.DATE,
    rdate: DataTypes.DATE,
    retype: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tranc;
};