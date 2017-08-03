'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tranc = sequelize.define('Tranc', {
        brdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rdate: {
            type: DataTypes.DATE,
            allowNull: true,

        },
        retype: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                tranc.belongsTo(models.users, {
                    foreignKey: 'userId',
                    onDelete: 'CASCADE',
                });
            },

            associate: (models) => {
                tranc.belongsTo(models.books, {
                    foreignKey: 'bookId',
                    onDelete: 'CASCADE',
                });
            },
        },
    });
    return Tranc;
};