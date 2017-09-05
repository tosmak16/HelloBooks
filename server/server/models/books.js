export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    bookTitle: {
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
          msg: 'Author name should be more than 3 characters long',
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
          msg: 'Author name should be more than 3 characters long',
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'category cannot be empty',
        },
        is: {
          args: /(\w)/i,
          msg: 'category only contain strings',
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
          args: [6 - 9],
          msg: 'Isbn should be 6 and 13 digits',
        },
      },
    },
    stocknumber: {
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
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'summary should be more than 3 characters long',
        },
      },

    },
  }, {
    classMethods: {
      associate: (models) => {
        Books.hasMany(models.borrowbook, {
          foreignKey: 'bookId',
          as: 'borrowbooks',
        });
      },
    },
  });
  return Books;
};
