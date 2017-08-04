'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tranc = sequelize.define('Tranc', {
        brdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        rdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        retype: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Tranc.belongsTo(models.Users, {
                        foreignKey: 'userId',
                        onDelete: 'CASCADE',
                    }),
                    Tranc.belongsTo(models.Books, {
                        foreignKey: 'bookId',
                        onDelete: 'CASCADE',
                    });
            }
        }
    });
    return Tranc;
};