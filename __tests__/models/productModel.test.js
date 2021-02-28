'use strict'

const ProductModel = require('../../src/models/Products.js');

describe('Testing PRODUCT MODEL functionality', () => {

  let products = new ProductModel();
  let obj = { name: "newName" };
  let updObj = { name: "updatedName" };

  //resetting the products database after each test to avoid side effects
  afterEach(() => {
    products.index = 0
    products.storage = [];
  })

  //testing create functionality
  it('should create a product record and add it to the db',() => {
    expect(products.createOne(obj)).toEqual({ id: 0, data: obj });
    expect(products.storage.length).toEqual(1);
  })

  //test get functionality
  it('should return a product record if given a valid id', () => {
    products.createOne(obj);
    expect(products.getOne(0)).toEqual({ id: 0, data: obj });
    expect(products.storage.length).toEqual(1);
  })

  it('should return undefined if there is no matching record', () => {
    expect(products.getOne(10)).toEqual(undefined);
  })

  //testing updating functionality
  it('should update existing values', () => {
    products.createOne(obj);
    expect(products.updateOne(0, updObj)).toEqual(
      { id: 0, data: updObj }
    );
    expect(products.storage.length).toEqual(1);
    expect(products.getOne(0)).toEqual(
      { id: 0, data: updObj }
    );
  })

  //testing delete one functionality
  it('should delete one record and return null', () => {
    products.createOne(obj);
    expect(products.deleteOne(0)).toEqual(null);
    expect(products.storage.length).toEqual(0);
    expect(products.storage.find(record => record.id === 0)).toEqual(undefined);
  })

})
