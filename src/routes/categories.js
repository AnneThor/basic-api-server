'use strict'

const express = require('express');
const CategoryModel = require('../models/Categories.js');
const categories = new CategoryModel();
const categoryRouter = express.Router();

//routes
categoryRouter.get('/category', getAllCategories);
categoryRouter.get('/category/:id', getOneCategory);
categoryRouter.post('/category', createOneCategory);
categoryRouter.put('/category/:id', updateOneCategory);
categoryRouter.delete('/category/:id', deleteOneCategory);

//route handlers
function getAllCategories(req, res) {
  res.status(200).json(categories.getAll());
}

function getOneCategory(req, res) {
  res.status(200).json(categories.getOne(parseInt(req.params.id)))
}

function createOneCategory(req, res) {
  res.status(201).json(categories.createOne(req.body));
}

function updateOneCategory(req, res) {
  res.status(200).json(categories.updateOne(parseInt(req.params.id), req.body));
}

function deleteOneCategory(req, res) {
  res.status(200).json(categories.deleteOne(parseInt(req.params.id)));
}

module.exports = {
  categoryRouter: categoryRouter,
  categories: categories
}
