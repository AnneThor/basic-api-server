'use strict'

const express = require('express');
const app = express();

const { productRouter } = require('./routes/products.js');
const { categoryRouter } = require('./routes/categories.js');

const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');

app.use(express.json());
app.use(productRouter);
app.use(categoryRouter);

//error handling middleware (at end of chain)
app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  }
}
