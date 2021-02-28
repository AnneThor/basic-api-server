'use strict'

const supertest = require('supertest');
const { categories } = require('../../src/routes/categories.js');
const CategoryModel = require('../../src/models/Categories.js');
const { server } = require('../../src/server.js');
const mockRequest = supertest(server);

describe('Testing Middleware on CATEGORY routes', () => {

  let req = {};
  let res = {};

  //need to prepopulate the db
  beforeEach(() => {
    for (let i=0; i<5; i++) {
      categories.createOne({"name": `category${i}`});
    }
  })

  afterEach(() => {
    categories.storage = [];
    categories.index = 0;
  })

  //testing get All function
  it('should return an array of all existing categories', async () => {
    await mockRequest.get('/category')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.length).toEqual(5);
        expect(reply.body).toEqual([
          { id: 0, data: { name: "category0"} },
          { id: 1, data: { name: "category1"} },
          { id: 2, data: { name: "category2"} },
          { id: 3, data: { name: "category3"} },
          { id: 4, data: { name: "category4"} }
        ])
      })
  })

  //testing get one
  it('should return one array with the matching id if it exists', async () => {
    await mockRequest.get('/category/0')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual({ id: 0, data: { name: "category0"} })
      })

  })

  it('should return undefined if there is no matching record', async () => {
    await mockRequest.get('/category/10')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual("");
      })
  })

  //testing updating functionality
  it('should update existing values', () => {
    req = { name: "newName!" };
    mockRequest.put('/category/0')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(categories.storage.length).toEqual(5);
        expect(reply.body).toEqual({ id: 0, data: { name: "newName!" } });
      })
  })

  //testing delete one functionality
  it('should delete one record and return null', async () => {
    await mockRequest.delete('/category/0')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toBe(null);
        expect(categories.storage.length).toEqual(4);
      })
  })

})
