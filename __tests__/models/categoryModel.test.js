'use strict'

const CategoryModel = require('../../src/models/Categories.js');

describe('Testing CATEGORY MODEL functionality', () => {

  let categories = new CategoryModel();
  let obj = { name: "newName" };
  let updObj = { name: "updatedName" };

  //resetting the categories database after each test to avoid side effects
  afterEach(() => {
    categories.index = 0
    categories.storage = [];
  })

  //testing create functionality
  it('should create a category record and add it to the db',() => {
    expect(categories.createOne(obj)).toEqual({ id: 0, data: obj });
    expect(categories.storage.length).toEqual(1);
  })

  //test get functionality
  it('should return a category record if given a valid id', () => {
    categories.createOne(obj);
    expect(categories.getOne(0)).toEqual({ id: 0, data: obj });
    expect(categories.storage.length).toEqual(1);
  })

  it('should return undefined if there is no matching record', () => {
    expect(categories.getOne(10)).toEqual(undefined);
  })

  //testing updating functionality
  it('should update existing values', () => {
    categories.createOne(obj);
    expect(categories.updateOne(0, updObj)).toEqual(
      { id: 0, data: updObj }
    );
    expect(categories.storage.length).toEqual(1);
    expect(categories.getOne(0)).toEqual(
      { id: 0, data: updObj }
    );
  })

  //testing delete one functionality
  it('should delete one record and return null', () => {
    categories.createOne(obj);
    expect(categories.deleteOne(0)).toEqual(null);
    expect(categories.storage.length).toEqual(0);
    expect(categories.storage.find(record => record.id === 0)).toEqual(undefined);
  })

})
