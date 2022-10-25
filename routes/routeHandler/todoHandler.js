// dependencies
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../../models/schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all todos
// using callback function
router.get('/', (req, res) => {
  Todo.find({ status: 'active' })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'There is a server side error!' });
      } else {
        res.status(200).json({
          result: data,
          message: 'Active todos are shown here successfully!!',
        });
      }
    });
});

// get active todos
router.get('/active', async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
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
// using callback function
router.post('/', (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({ message: 'Todo added successfully!!' });
    }
  });
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
