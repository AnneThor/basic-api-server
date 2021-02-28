'use strict'

const supertest = require('supertest');
const { products } = require('../../src/routes/products.js');
const ProductModel = require('../../src/models/Products.js');
const { server } = require('../../src/server.js');
const mockRequest = supertest(server);

describe('Testing Middleware on PRODUCT routes', () => {

  let req = {};
  let res = {};

  //need to prepopulate the db
  beforeEach(() => {
    for (let i=0; i<5; i++) {
      products.createOne({"name": `product${i}`});
    }
  })

  afterEach(() => {
    products.storage = [];
    products.index = 0;
  })

  //testing get All function
  it('should return an array of all existing products', async () => {
    await mockRequest.get('/product')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body.length).toEqual(5);
        expect(reply.body).toEqual([
          { id: 0, data: { name: "product0"} },
          { id: 1, data: { name: "product1"} },
          { id: 2, data: { name: "product2"} },
          { id: 3, data: { name: "product3"} },
          { id: 4, data: { name: "product4"} }
        ])
      })
  })

  //testing get one
  it('should return one array with the matching id if it exists', async () => {
    await mockRequest.get('/product/0')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual({ id: 0, data: { name: "product0"} })
      })

  })

  it('should return undefined if there is no matching record', async () => {
    await mockRequest.get('/product/10')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toEqual("");
      })
  })

  //testing updating functionality
  it('should update existing values', () => {
    req = { name: "newName!" };
    mockRequest.put('/product/0')
      .then(reply => {
        expect(reply.status).toBe(201);
        expect(products.storage.length).toEqual(5);
        expect(reply.body).toEqual({ id: 0, data: { name: "newName!" } });
      })
  })

  //testing delete one functionality
  it('should delete one record and return null', async () => {
    await mockRequest.delete('/product/0')
      .then(reply => {
        expect(reply.status).toBe(200);
        expect(reply.body).toBe(null);
        expect(products.storage.length).toEqual(4);
      })
  })

})
