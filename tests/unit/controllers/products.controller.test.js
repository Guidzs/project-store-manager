const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

const mocksController = require('../_mocks/controllers/products.mock');

chai.use(sinonChai);

describe('Testes da camada Controller', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      const req = {};
      const res = {};

      sinon.stub(productsService, 'findAll').resolves(mocksController.mockGetProducts);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocksController.mockGetProducts.message);
    });
    afterEach(sinon.restore);
  });
  
  describe('Testa a função getProductsById', () => {
    it('se não é possivel chamar um produto inexistente', async () => {
      const req = { params: { id: 0 }};
      const res = {};

      sinon.stub(productsService, 'getProductById').resolves(mocksController.mockGetByIdErr);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    it('se é possive chamar um unico produto', async () => {
      const req = { params: { id: 1 }};
      const res = {};

      sinon.stub(productsService, 'getProductById').resolves(mocksController.mockGetById);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocksController.mockGetById.message);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductByName', () => {
    it('se q for vazio retorna todos os produtos', async () => {
      req = { query: { q: '' }};
      res = {};

      sinon.stub(productsService, 'findAll').resolves(mocksController.mockGetProducts);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocksController.mockGetProducts.message);
    });

    it('se é possivel filtrar um produto pelo nome', async () => {
      const req = { query: { q: 'Martelo' } };
      const res = {};

      sinon.stub(productsService, 'getProductByName').resolves(mocksController.mockGetByName);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocksController.mockGetByName.message);
    });
    afterEach(sinon.restore);
  });
});