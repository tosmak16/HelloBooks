'use strict';
module.exports = (sequelize, DataTypes) => {
    var Transaction = sequelize.define('Transaction', {
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
        },
        userId: {
            type: DataTypes.INTEGER,

            onDelete: 'CASCADE',

        },
        bookId: {
            type: DataTypes.INTEGER,

            onDelete: 'CASCADE',

        },

    }, {
        classMethods: {
            associate: (models) => {
                Transaction.belongsTo(models.Users, {
                    foreignKey: 'userId',
                    onDelete: 'CASCADE',
                });
            },
            associate: (models) => {
                Transaction.belongsTo(models.Books, {
                    foreignKey: 'bookId',
                    onDelete: 'CASCADE',
                });
            }
        }
    });
    return Transaction;
};