const database = require('database');

exports.createOrder = async (event, context) => {
  const {
    id,    // product_id
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    paymentMethod,
    quantity
  } = JSON.parse(event.body);
  try {
    const connection = await database.connect();
    const sql = `INSERT INTO orders (product_id, firstName, lastName,email,phoneNumber,address,paymentMethod,quantity) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *`;
    const result = await connection.query(sql, [
      id,
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      paymentMethod,
      quantity
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
        message: 'Order created successfully'
      })
    };
    return response;
  } catch (err) {
    const response = {
      statusCode: 406,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE,PUT,HEAD'
      },
      body: JSON.stringify({
        status: true,
        data: err,
        message: err.message
      })
    }; 
    return response;
  }
};
