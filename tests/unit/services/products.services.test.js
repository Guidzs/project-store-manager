const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const validate = require('../../../src/services/validations');

const mocks = require('../_mocks/controllers/products.mock');
const mocksService = require('../_mocks/services/products.mock');

describe('Testa a camada Service', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocksService.mockAllProducts);

      const products = await productsService.findAll();

      expect(products.type).to.be.equal(null);
      expect(products.message).to.be.deep.equal(mocksService.mockAllProducts);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductById', () => {
    // it('se não é possivel chamar um produto inexistente', async () => {
    //   sinon.stub(validate, 'validateProductId').resolves(mocks.mockGetByIdErr);

    //   const error = validate.validateProductId(0);

    //   expect(error.type).to.be.equal(true);
    //   expect(error).to.be.deep.equal(mocks.mockGetByIdErr);
    // });

    it('se é possivel chamar um produto', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocksService.mockOneProduct);

      const product = await productsService.findAll(1);

      expect(product).to.be.an('object');
      expect(product.message).to.be.deep.equal(mocksService.mockOneProduct);
    });
    afterEach(sinon.restore);
  });
});