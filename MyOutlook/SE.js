const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello Cypress Server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});