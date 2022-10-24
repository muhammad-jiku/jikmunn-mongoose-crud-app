// dependencies
const express = require('express');
const router = express.Router();

// get all todos
router.get('/', async (req, res) => {});

// get a todo by id
router.get('/:id', async (req, res) => {});

// post todo
router.post('/', async (req, res) => {});

// post multiple todo
router.post('/all', async (req, res) => {});

// update a todo by id
router.put('/:id', async (req, res) => {});

// delete a todo by id
router.delete('/:id', async (req, res) => {});

module.exports = router;
