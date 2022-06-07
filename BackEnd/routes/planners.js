const { Planner } = require("../models/planner");
const express = require("express");
const Joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

//GET REQUEST
router.get("/", auth, async (req, res) => {
  try {
    const planners = await Planner.find().sort({ date: -1 });
    const filteredPlanners = planners.filter(
      (planner) => planner.uid === req.user._id
    );
    res.send(filteredPlanners);
  } catch (error) {
    res.status(500).send(error.message); //500 means server error
    console.log(error.message);
  }
});

//POST REQUEST
router.post("/", auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  }); //}).options({abortEarly: false}) use this to access all error messages.

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 means bad request, means client error not server error

  //extracting properties
  const { name, author, isComplete, date, uid } = req.body;
  let planner = new Planner({
    name,
    author,
    isComplete,
    date,
    uid,
  });
  try {
    planner = await planner.save();
    res.send(planner);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//PUT REQUEST
router.put("/:id", auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const planner = await Planner.findById(req.params.id); //check whether doc exists or not
    if (!planner) return res.status(404).send("Planner not found..."); //not found
    if (planner.uid !== req.user._id)
      return res.status(401).send("Task update failed. Not authorized");

    const { name, author, isComplete, date, uid } = req.body;

    const updatedPlanner = await Planner.findByIdAndUpdate(
      req.params.id,
      {
        name,
        author,
        isComplete,
        date,
        uid,
      },
      { new: true }
    );

    res.send(updatedPlanner);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//PATCH REQUEST
router.patch("/:id", auth, async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);
    if (!planner) return res.status(404).send("Planner not found...");
    if (planner.uid !== req.user._id)
      return res.status(401).send("Task check/uncheck failed. Not authorized");

    const updatedPlanner = await Planner.findByIdAndUpdate(
      req.params.id,
      {
        isComplete: !planner.isComplete, //set it to opposite
      },
      { new: true }
    );
    res.send(updatedPlanner);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//DELETE REQUEST
router.delete("/:id", auth, async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);
    if (!planner) return res.status(404).send("Planner not found...");
    if (planner.uid !== req.user._id)
      return res.status(401).send("Task deletion failed. Not authorized");

    //deleteOne() and deleteMany() and findByIdAndDelete(), only the last one needs path editing before async
    const deletedPlanner = await Planner.findByIdAndDelete(req.params.id);
    res.send(deletedPlanner);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});
module.exports = router;
