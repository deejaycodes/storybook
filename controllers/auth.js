const userServices = require("../services/userServices");
const encryptionManager = require("../libs/encryption");
const responsesHelper = require("../libs/responseHelper");

class Auth {
  async signUp(req, res) {
    let data = req.body;
    try {
      const userExist = await userServices.getUser({ email: data.email });
      if (userExist) {
        return res
          .status(400)
          .send(responsesHelper.error(400, "Email is already registered"));
      }

      const param = {
        email: data.email,
        password: data.password,
      };

      //add new user object
      const user = await userServices.addUser(param);
      await user.generateAuthToken();
      await user.save();
      user;
      res.status(201).send(responsesHelper.success(201, user));
    } catch (error) {
      res.status(500).send(responsesHelper.error(500, `${error}`));
    }
  }

  async logIn(req, res) {
    const { email, password } = req.body;
    //check if email and password is filled
    if (!email || !password) {
      return res
        .status(400)
        .send(responsesHelper.error(400, "Email and Password is required"));
    }

    //check if user exists in the database
    try {
      const user = await userServices.getUser({ email });
      if (user) {
        //check if password is correct
        if (encryptionManager.compareHashed(password, user.password)) {
          //generate a token for the user to login
          await user.generateAuthToken();
          res
            .status(200)
            .send(responsesHelper.success(200, "User logged in successfully"));
        } else {
          return res
            .status(400)
            .send(responsesHelper.error(400, "Incorrect login details"));
        }
      } else {
        return res
          .status(400)
          .send(responsesHelper.error(400, "User does not exist"));
      }
    } catch (error) {
      res.status(500).send(responsesHelper.error(500, `${error}`));
    }
  }
}

const auth = new Auth();
module.exports = auth;
