const mongoose = require("mongoose");
const validator = require("validator");
const schemaMethods = require("./userMethods");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

schemaMethods(userSchema);

module.exports = mongoose.model("User", userSchema);
