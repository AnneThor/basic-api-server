'use strict'

const express = require('express');
const ProductModel = require('../models/Products.js');
const products = new ProductModel();
const productRouter = express.Router();

//routes
productRouter.get('/product', getAllProducts);
productRouter.get('/product/:id', getOneProduct);
productRouter.post('/product', createOneProduct);
productRouter.put('/product/:id', updateOneProduct);
productRouter.delete('/product/:id', deleteOneProduct);

//route handlers
function getAllProducts(req, res) {
  res.status(200).json(products.getAll());
}

function getOneProduct(req, res) {
  res.status(200).json(products.getOne(parseInt(req.params.id)))
}

function createOneProduct(req, res) {
  res.status(201).json(products.createOne(req.body));
}

function updateOneProduct(req, res) {
  res.status(200).json(products.updateOne(parseInt(req.params.id), req.body));
}

function deleteOneProduct(req, res) {
  res.status(200).json(products.deleteOne(parseInt(req.params.id)));
}

module.exports = {
  productRouter: productRouter,
  products: products
}
