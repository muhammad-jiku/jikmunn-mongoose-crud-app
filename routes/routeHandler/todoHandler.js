// dependencies
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../../models/schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all todos
router.get('/', async (req, res) => {
  await Todo.find({ status: 'active' })
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

// get a todo by id
router.get('/:id', async (req, res) => {});

// post todo
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({ message: 'Todo added successfully!!' });
    }
  });
});

// post multiple todo
router.post('/all', async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: 'There is a server side error!' });
    } else {
      res.status(200).json({ message: 'Todos added successfully!!' });
    }
  });
});

// update a todo by id
router.put('/:id', async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
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
router.delete('/:id', async (req, res) => {});

module.exports = router;
