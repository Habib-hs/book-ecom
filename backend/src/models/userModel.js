const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //remove whitelist
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    desc : {
      type: String,
     //trim: true,
    },
    salt: String,

    role: {
      type: Boolean,
      default: false,
    },
    history: {
      type: Array,
      default: [],
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
