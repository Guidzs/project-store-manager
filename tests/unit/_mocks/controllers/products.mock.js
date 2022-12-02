const mockGetProducts = {
  message: [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ]
};

const mockGetByIdErr = {
  type: true,
  message: "Product not found",
};

const mockGetById = {
  type: null,
  message: {
    "id": 1,
    "name": "Martelo de Thor"
  },
};

const mockGetByName = {
  message: [
    {
      "id": 1,
      "name": "Martelo de Thor"
    }
  ]
};

module.exports = {
  mockGetProducts,
  mockGetByIdErr,
  mockGetById,
  mockGetByName,
};
