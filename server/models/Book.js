export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'book title cannot be empty',
        },
        is: {
          args: /(\w)+/i,
          msg: 'book title can only contain strings',
        },
        len: {
          args: [3, 50],
          msg: 'book title should be at the range of 3 to 50 charaters',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'author cannot be empty',
        },
        is: {
          args: /(\w)+/i,
          msg: 'author can only contain strings',
        },
        len: {
          args: [3, 50],
          msg: 'Author name should be at the range of 3 to 50 charaters',
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'book category cannot be empty',
        },
        is: {
          args: /(\w)/i,
          msg: 'book Category only contain strings',
        },
      },
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Isbn cannot be empty',
        },
        len: {
          args: [6 - 12],
          msg: 'Isbn should be between 6 and 12 digit number',
        },
      },
    },
    stockNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'number in stock cannot be empty',
        },
        isNumeric: {
          args: true,
          msg: 'number in stock must be a number',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bookFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'Book summary ranges between 0 and 500',
        },
      },

    },
  }, {
    classMethods: {
      associate: (models) => {
        Books.hasMany(models.BorrowedBooks, {
          foreignKey: 'bookId',
          as: 'BorrowedBooks',
        });
      },
    },
  });
  return Books;
};
