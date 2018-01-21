import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty',
        },
        len: {
          args: [3, 100],
          msg: 'username should be at the range of three to fifty charaters',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty',
        },
        isEmail: {
          args: true,
          msg: 'Email field must contain a valid email address',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'firstname cannot be empty',
        },
        is: {
          args: /(\D+)/,
          msg: 'firstname can only contain strings',
        },
        len: {
          args: [2, 100],
          msg: 'Firstname should range between 2 to 50 charaters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'lastname cannot be empty',
        },
        is: {
          args: /(\w)/i,
          msg: 'lastname can only contain strings',
        },
        len: {
          args: [2, 100],
          msg: 'Lastname should range between 2 to 50 charaters',
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled'],
      defaultValue: 'user',
    },

    membershipType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Basic',
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'mobile number must be a number',
        },
        len: {
          args: [2, 15],
          msg: 'mobile number should range between 2 to 15 digits',
        },

      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.BorrowedBooks, {
          foreignKey: 'userId',
          as: 'BorrowedBooks',

        });
      },
    },
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = user.dataValues.password;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(hashedPassword, salt);
        user.password = encryptedPassword;
        return user;
      }
    }
  });
  return Users;
};
