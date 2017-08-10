// import dotenv from 'dotenv';
// const config = dotenv.config();
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
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
