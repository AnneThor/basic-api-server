'use strict'

const supertest = require('supertest');
const { server } = require('../src/server.js');
const mockRequest = supertest(server); //starting up fake server

describe('SERVER FUNCTIONALITY', () => {

  it('should return 404 on a missing route', async() => {
    await mockRequest.get('/non-existing-route')
      .then(reply => {
        expect(reply.status).toBe(404);
      })
  })

  it('should return 404 on an invalid method', async() => {
    await mockRequest.put('/category')
      .then(reply => {
        expect(reply.status).toBe(404);
      })
  })

  it('should return 200 on a valid request', async() => {
    await mockRequest.get('/category')
      .then(reply => {
        expect(reply.status).toBe(200);
      })
  })

})
