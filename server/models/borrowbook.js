export default (sequelize, DataTypes) => {
  const borrowbook = sequelize.define('borrowbook', {
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
      allowNull: false,
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
        borrowbook.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        borrowbook.belongsTo(models.Books, {
          foreignKey: 'bookId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return borrowbook;
};
