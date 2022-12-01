const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const getProductByName = async (name) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE products.name
    LIKE "%${name}%"`,
    [],
  );
  return result;
};

const saveProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET products.name = ?
    WHERE products.id = ?`,
    [name, id],
  );
  return { id, name };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE products.id = ?;`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  getProductById,
  getProductByName,
  saveProduct,
  updateProduct,
  deleteProduct,
};
