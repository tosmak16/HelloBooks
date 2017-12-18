export default (sequelize, DataTypes) => {
  const BorrowedBooks = sequelize.define('BorrowedBooks', {
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returnType: {
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
        BorrowedBooks.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        BorrowedBooks.belongsTo(models.Books, {
          foreignKey: 'bookId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return BorrowedBooks;
};
