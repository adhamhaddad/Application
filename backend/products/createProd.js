const database = require('database');

exports.createProduct = async (event, context) => {
  const { product_name, product_price, product_desc } = JSON.parse(event.body);
  try {
    const connection = await database.connect();
    const sql = `INSERT INTO products (product_name, product_price, product_desc) VALUES ($1, $2, $3) RETURNING *`;
    const result = await connection.query(sql, [
      product_name,
      product_price,
      product_desc
    ]);
    connection.release();
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE,PUT,HEAD'
      },
      body: JSON.stringify({
        status: true,
        data: result.rows[0],
        message: 'Product created successfully'
      })
    };
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
