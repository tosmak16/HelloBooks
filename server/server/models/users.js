'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        membershipType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.tranc, {
                    foreignKey: 'userId',
                    as: 'tranc',
                });
            },
        },
    });
    return Users;
};