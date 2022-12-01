const connection = require('./connection');

const registerSales = async (itens) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) value (NOW());',
  );

  const result = itens.map((item) => connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) values (?, ?, ?);',
      [insertId, item.productId, item.quantity],
    ));
  await Promise.all(result);
  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT SP.sale_id AS saleId, SL.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales AS SL
    INNER JOIN StoreManager.sales_products AS SP
    ON SL.id = SP.sale_id`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT SL.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales AS SL
    INNER JOIN StoreManager.sales_products AS SP
    ON SL.id = SP.sale_id
    WHERE SL.id = ?`,
    [id],
  );
  return result;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE sales.id = ?`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  deleteSale,
};
