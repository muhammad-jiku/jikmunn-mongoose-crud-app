// dependencies
const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routes/routeHandler/todoHandler');

//  app initialization
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// database connection with mongoose
mongoose
  .connect('mongodb://localhost/jikmunn-mongoose-crud-app', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected!!'))
  .catch((err) => console.log(err));

// default error handling
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

// application routes
app.use('/todo', todoHandler);

// displaying message
app.get('/', (req, res) => {
  res.send('Welcome here!');
});

// listening to the poert
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
