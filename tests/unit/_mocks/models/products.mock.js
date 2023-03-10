const mockAllProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const mockOneProduct = {
  "id": 1,
  "name": "Martelo de Thor"
};

const mockGetByName = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
];

const mockInsertId = [{ insertId: 4 }];

const mockDeleteResult = [{ affectedRows: 1 }];

module.exports = {
  mockAllProducts,
  mockOneProduct,
  mockGetByName,
  mockInsertId,
  mockDeleteResult,
};