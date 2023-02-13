const database = require('database');

exports.getProduct = async (event, context) => {
  // const { product_id } = JSON.parse(event.body);
  try {
    const connection = await database.connect();
    const sql = 'SELECT * FROM products';
    const result = await connection.query(sql);
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
        data: result.rows,
        message: 'Products received successfully',
        context: context.functionName
      })
    };
    return response;
  } catch (err) {
    return err.message;
  }
};
