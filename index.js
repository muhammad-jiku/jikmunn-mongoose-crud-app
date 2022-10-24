// dependencies
const express = require('express');

//  app initialization
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// listening to the poert
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
