//Joi to validate inputs
//Check whether user exists
//if true, validate pwd
//generate json web token aka jwt
//send to client

const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    //name not required for signin
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    //using bcrypt to compare pwd
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //checking valid pwd or not
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

      const secretKey = process.env.SECRET_KEY
      //first param = payload, second param = secretkey
      const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, secretKey )
      res.send(token)  //send token to client securely

  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});
module.exports = router