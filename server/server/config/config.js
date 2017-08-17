require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_DEV_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_TEST_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,

  },
};
