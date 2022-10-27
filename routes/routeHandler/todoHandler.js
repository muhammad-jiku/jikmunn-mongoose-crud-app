// dependencies
const express = require('express');
const mongoose = require('mongoose');
const checkSignIn = require('../../middlewares/checkSignIn');
const router = express.Router();
const todoSchema = require('../../models/schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all todos
// using callback function
router.get('/', checkSignIn, (req, res) => {
  console.log(req.username);
  console.log(req.userId);
  Todo.find({})
    .populate('user', 'name username')
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    // .limit(2)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'There is a server side error!' });
      } else {
        res.status(200).json({
          result: data,
          message: 'All todos are shown here successfully!!',
        });
      }
    });
});

// get active todos
// using async await and try catch
router.get('/active', async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// get all active todos
// using callback
router.get('/active-callback', (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
});

// get data based on title
// using async await and try catch
router.get('/title', async (req, res) => {
  try {
    const data = await Todo.findByTitle();
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// GET TODOS BY LANGUAGE
router.get('/titlee', async (req, res) => {
  try {
    const data = await Todo.find().byTitle('ho');
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// get a todo by id
// using async await and try catch
router.get('/:id', async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id }).select({
      __v: 0,
    });
    res.status(200).json({
      result: data,
      message: 'SUCCESS!!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// post todo
// using async await and try catch
router.post('/', checkSignIn, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.userId,
  });
  try {
    await newTodo.save();
    res.status(200).json({ message: 'Todo added successfully!!' });
  } catch (err) {
    res.status(500).json({ error: 'There is a server side error!' });
  }
});

// post multiple todo
// using callback function
router.post('/all', (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({ message: 'Todos added successfully!!' });
    }
  });
});

// update a todo by id
// using callback function
router.put('/:id', (req, res) => {
  const result = Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: 'active',
      },
    },
    {
      //   new: true,
      //   useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({ error: 'There is a server side error!' });
      } else {
        res.status(200).json({ message: 'Todo updated successfully!!' });
      }
    }
  ).clone();
  console.log(result);
});

// delete a todo by id
// using callback function
router.delete('/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({
        message: 'Todo was deleted successfully!!',
      });
    }
  }).clone();
});

module.exports = router;
