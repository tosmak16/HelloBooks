'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Trancs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            brdate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            rdate: {
                type: Sequelize.DATE,
                allowNull: true
            },
            retype: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Trancs');
    }
};