const connection = require('./connection');

const registerSales = async (itens) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) value (NOW());',
  );

  const result = itens.map(async (item) => await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) values (?, ?, ?);',
      [insertId, item.productId, item.quantity],
    ));
  await Promise.all(result);
  return insertId;
};

module.exports = {
  registerSales,
};
