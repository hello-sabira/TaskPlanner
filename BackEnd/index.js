const planners = require("./routes/planners");
const signUp = require("./routes/signUp")
const signIn = require("./routes/signIn")
const express = require("express"); //be careful, express in double quotes
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//creating endpoint function
const app = express(); //will represent our express application

app.use(cors()); //cors is a middleware and adds functionality to our app
app.use(express.json()); //configure json

app.use("/api/planners", planners);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn)

//fetch something from this route using get
app.get("/", (req, res) => {
  res.send("Welcome to our task planner api");
});

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000; //not all time port 5000 visible so set up const port

app.listen(port, () => {
  console.log(`Server running on port ${port}`); //node index.js in cmd will return server running on port 5000
});
mongoose
  .connect(connection_string, {
    useNewUrlParser: true, //now mongoDB assumes these two are always true as of version 6.0
    //useCreateIndex: true,not supported anymore as of version 6.0
    useUnifiedTopology: true,
    //useFindAndModify: false
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed:", error.message));
