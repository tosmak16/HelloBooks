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
    }, {
        classMethods: {
            associate: (models) => {
                Books.hasMany(models.Transaction, {
                    foreignKey: 'bookId',
                    as: 'transactions',
                });
            }
        }
    });
    return Books;
};