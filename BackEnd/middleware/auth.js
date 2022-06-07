//create middleware function to check if user logged in
//does token exist?
//verify token using next()

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check if token exists
  if (!token) return res.status(401).send("Not authorized");

  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
module.exports = auth;
