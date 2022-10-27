// dependencies
require('dotenv').config(); // also a middleware
const jwt = require('jsonwebtoken');

const checkSignIn = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Authentication failed!' });
  }
};

module.exports = checkSignIn;
