const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');

const mocks = require('../_mocks/controllers/products.mock');
const mocksModel = require('../_mocks/models/products.mock');

describe('Testa a camada Model', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      sinon.stub(connection, 'execute').resolves([mocksModel.mockAllProducts]);


      const products = await productsModel.findAll();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(mocksModel.mockAllProducts);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductById', () => {
    it('se é possivel chamar um produto', async () => {
      sinon.stub(connection, 'execute').resolves([mocks.mockGetById.message]);

      const product = await productsModel.findAll(1);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(mocks.mockGetById.message);
    });
    afterEach(sinon.restore);
  });
});