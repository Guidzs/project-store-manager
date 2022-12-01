const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const mocks = require('../_mocks/controllers/products.mock');

chai.use(sinonChai);

describe('Testes da camada Controller', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      const req = {};
      const res = {};

      sinon.stub(productsService, 'findAll').resolves(mocks.mockGetProducts);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.mockGetProducts.message);
    });
    afterEach(sinon.restore);
  });
  
  describe('Testa a função getProductsById', () => {
    it('se não é possivel chamar um produto inexistente', async () => {
      const req = { params: { id: 0 }};
      const res = {};

      sinon.stub(productsService, 'getProductById').resolves(mocks.mockGetByIdErr);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    it('se é possive chamar um unico produto', async () => {
      const req = { params: { id: 1 }};
      const res = {};

      sinon.stub(productsService, 'getProductById').resolves(mocks.mockGetById);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.mockGetById.message);
    });
    afterEach(sinon.restore);
  });
});