// config.js
require('dotenv').config(); // Load environment variables from .env file

const config = {
  database: {
    host: process.env.DB_HOST,
    mysql_user: process.env.DB_USER,
    mysql_password: process.env.DB_PASSWORD,
    mysql_db: process.env.DB_NAME,
  },
  token: {
    tokenSecretKey:process.env.DB_HOST,
    refreshTokenSecretKey:process.env.DB_HOST,
  }
};

module.exports = config;
