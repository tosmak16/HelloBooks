'use strict';
module.exports = (sequelize, DataTypes) => {
    var Books = sequelize.define('Books', {
        bookTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stocknumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        classMethods: {
            associate: (models) => {
                Books.hasMany(models.borrowbook, {
                    foreignKey: 'bookId',
                    as: 'borrowbooks',
                });
            }
        }
    });
    return Books;
};