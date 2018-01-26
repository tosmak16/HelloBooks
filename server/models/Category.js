export default (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty',
        },
        len: {
          args: [3, 25],
          msg: 'Category should be in the range of 3 to 25 charaters',
        },
      },
    },
  });
  return Categories;
};
