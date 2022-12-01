const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const validate = require('../../../src/services/validations');

const mocks = require('../_mocks/controllers/products.mock');

describe('Testa a camada Service', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocks.mockGetProducts.message);

      const products = await productsService.findAll();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(mocks.mockGetProducts.message);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductById', () => {
    it('se não é possivel chamar um produto inexistente', async () => {
      sinon.stub(validate, 'validateProductId').resolves(mocks.mockGetByIdErr);

      const error = validate.validateProductId(0);

      expect(error).to.be.an('object');
      expect(error).to.be.deep.equal(mocks.mockGetByIdErr);
    });

    it('se é possivel chamar um produto', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocks.mockGetById.message);

      const product = await productsService.findAll(1);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(mocks.mockGetById.message);
    });
    afterEach(sinon.restore);
  });
});