'use strict';
module.exports = function(sequelize, DataTypes) {
  var Books = sequelize.define('Books', {
    bookTitle: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    isbn: DataTypes.STRING,
    stocknumber: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Books;
};