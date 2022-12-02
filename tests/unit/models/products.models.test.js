const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');

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
      sinon.stub(connection, 'execute').resolves([mocksModel.mockOneProduct]);

      const product = await productsModel.findAll(1);

      expect(product).to.be.an('object');
      expect(product).to.be.deep.equal(mocksModel.mockOneProduct);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função getProductsByName', () => {
    it('se a função tem o retorno esperado', async () => {
      sinon.stub(connection, 'execute').resolves([mocksModel.mockAllProducts]);


      const products = await productsModel.findAll();

      expect(products).to.be.an('array');
      expect(products).to.be.deep.equal(mocksModel.mockAllProducts);
    });

    it('se é possivel filtrar um produto pelo nome', async () => {
      sinon.stub(connection, 'execute').resolves([mocksModel.mockGetByName]);

      const result = await productsModel.getProductByName('martelo');

      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(mocksModel.mockGetByName);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função saveProducts', () => {
    it('se é possivel adicionar um produto', async () => {
      sinon.stub(connection, 'execute').resolves(mocksModel.mockInsertId);

      const result = await productsModel.saveProduct('ProdutoX');
      
      expect(result).to.be.equal(4);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função updateProduct', () => {
    it('se é possivel atualizat um produto', async () => {
      sinon.stub(connection, 'execute').resolves();

      const result = await productsModel.updateProduct(1, 'Martelo de Thor');

      expect(result).to.be.deep.equal(mocksModel.mockOneProduct);
    });
    afterEach(sinon.restore);
  });

  describe('Testa a função deleteProduct', () => {
    it('se é possiver deletar um produto', async () => {
      sinon.stub(connection, 'execute').resolves(mocksModel.mockDeleteResult);

      const result = await productsModel.deleteProduct(1);

      expect(result).to.be.equal(1);
    });
    afterEach(sinon.restore);
  });
});