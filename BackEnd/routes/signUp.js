//Joi
//does user exist?
//create new user if not and hash pwd (bcrypt)
//save user

const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 meaning client error

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with this email, already exists");

    const { name, email, password } = req.body;

    //create user
    user = new User({
      name,
      email,
      password,
    });

    //create salt
    const salt = await bcrypt.genSalt(10);
    //hash pwd
    user.password = await bcrypt.hash(user.password, salt);

    //save user to database
    await user.save();
    //res.send("user created");

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
