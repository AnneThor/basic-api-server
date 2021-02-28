'use strict'

const MockDatabase = require('./MockDatabase.js');

class Products extends MockDatabase {
 constructor() {
   super();
 }
}

module.exports = Products;
