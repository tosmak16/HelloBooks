'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('borrowbooks', {
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
            },
            userId: {
                type: Sequelize.INTEGER,

                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                },
            },
            bookId: {
                type: Sequelize.INTEGER,

                onDelete: 'CASCADE',
                references: {
                    model: 'Books',
                    key: 'id',
                    as: 'bookId',
                },
            },
        }),

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('borrowbooks');
    }
};