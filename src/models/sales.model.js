const connection = require('./connection');

const registerSales = async (itens) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) value (NOW());',
  );

  itens.forEach(async (item) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) values (?, ?, ?);',
      [+insertId, item.productId, item.quantity],
    ));
  return insertId;
};

module.exports = {
  registerSales,
};
