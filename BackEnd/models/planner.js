const mongoose = require("mongoose");
//import mongoose from "mongoose" //es6 syntax
//this object will have properties of our documents
const plannerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 300 }, //validating name is present
  author: { type: String, minlength: 3, maxlength: 30 },
  uid: String,
  isComplete: Boolean,
  date: { type: Date, default: new Date() },
});

//mongoose model will help us to directly interact with database, will use this Schema
//this is a global object
const Planner = mongoose.model("Planner", plannerSchema); //es6 way

//use it anywhere by exporting
exports.Planner = Planner;
//module.exports = Planner
//export default Planner
