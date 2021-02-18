const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config({ path: "../config/config.env" });

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).send({
        code: 401,
        error: true,
        msg: "Please provide an authorization token",
      });
    }

    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded._id;

    const user = await User.findOne({ _id: id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      code: 401,
      error: true,
      msg: "Please authenticate",
    });
  }
};

module.exports = auth;
