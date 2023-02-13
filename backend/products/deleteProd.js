const database = require('database');

exports.deleteProduct = async (event, context) => {
  const { product_id } = JSON.parse(event.body);
  try {
    const connection = await database.connect();
    const sql = 'DELETE FROM products WHERE product_id=$1 RETURNING product_id';
    const result = await connection.query(sql, [product_id]);
    connection.release();
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE,PUT,HEAD'
      },
      body: JSON.stringify({
        status: true,
        data: result.rows[0],
        message: 'Product deleted successfully'
      })
    };
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
