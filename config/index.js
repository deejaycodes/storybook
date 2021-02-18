const dotenv = require("dotenv");
dotenv.config();
const config = {
  JWTSECRET: process.env.JWTSECRET,
};

module.exports = config;
