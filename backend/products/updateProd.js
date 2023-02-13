const database = require('database');

exports.updateProduct = async (event, context) => {
  const { product_id, product_name, product_price, product_desc } = JSON.parse(
    event.body
  );
  try {
    const connection = await database.connect();
    const sql = `UPDATE products SET product_name=$2, product_price=$3, product_desc=$4 WHERE product_id=$1 RETURNING *`;
    const result = await connection.query(sql, [
      product_id,
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
        message: 'Product updated successfully'
      })
    };
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
