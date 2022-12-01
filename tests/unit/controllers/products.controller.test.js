const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const mocks = require('../_mocks/controllers/products.mock');

chai.use(sinonChai);

describe('Testes da camada Controller', () => {
  describe('Testa a função de getProducts', () => {
    test('se getProducts funciona', async () => {
      const req = {};
      const res = {};

      sinon.stub(productsService, 'findAll').resolves(mocks.mockGetProducts);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProducts(req, res);
      
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(mocks.mockGetProducts);
    });
    afterEach(sinon.restore);
  });
});