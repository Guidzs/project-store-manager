const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const mocksService = require('../_mocks/services/products.mock');

describe('Testa a camada Service', () => {
  describe('Testa a função getProducts', () => {
    it('se é possivel chamar os produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocksService.mockAllProducts);

      const products = await productsService.findAll();

      expect(products).to.be.an('object');
      expect(products.message).to.be.deep.equal(mocksService.mockAllProducts);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductById', () => {
    it('se é possivel chamar um produto', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocksService.mockOneProduct);

      const product = await productsService.findAll(1);

      expect(product).to.be.an('object');
      expect(product.message).to.be.deep.equal(mocksService.mockOneProduct);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductByName', () => {
    it('se a função tem o retorno esperado', async () => {
      sinon.stub(productsModel, 'findAll').resolves(mocksService.mockAllProducts);

      const products = await productsService.findAll();

      expect(products).to.be.an('object');
      expect(products.message).to.be.deep.equal(mocksService.mockAllProducts);
    });

    it('se é possivel filtrar um produto pelo nome', async () => {
      sinon.stub(productsModel, 'getProductByName').resolves(mocksService.mockGetByName);

      const result = await productsService.getProductByName('Martelo');

      expect(result).to.be.an('object');
      expect(result.message).to.be.deep.equal(mocksService.mockGetByName);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função saveProduct', () => {
    it('se é possivel adicionar um produto', async () => {
      sinon.stub(productsModel, 'saveProduct').resolves(4);
      sinon.stub(productsModel, 'getProductById').resolves(mocksService.mockNewProductSave);

      const result = await productsService.saveProduct('ProdutoX');

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(mocksService.mockNewProductSave);
    });
    afterEach(sinon.restore);
  });
});