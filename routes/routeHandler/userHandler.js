// dependencies
require('dotenv').config(); // also a middleware
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../../models/schemas/userSchema');
const User = new mongoose.model('User', userSchema);

// Signing up
// using callback function
router.post('/sign-up', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: 'Signing up new user successfully!!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// Signing in
// using callback function
router.post('/sign-in', async (req, res) => {
  try {
    const user = User.find({ username: req.body.username });
    if (user && user.length) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d',
          }
        );

        // sending response
        res.status(200).json({
          accessToken: token,
          message: 'Sign-in successful!!',
        });
      } else {
        console.log(err);
        res.status(401).json({ error: 'Authentication failed!' });
      }
    } else {
      console.log(err);
      res.status(401).json({ error: 'Authentication failed!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

module.exports = router;