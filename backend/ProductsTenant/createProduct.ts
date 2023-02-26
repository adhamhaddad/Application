import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import database from '/opt/nodejs/services/database';

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const { product_name, product_price, product_desc } = JSON.parse(event.body as string);
        const connection = await database.connect();
        const sql = 'INSERT INTO products (product_name, product_price, product_desc) VALUES ($1, $2, $3) RETURNING *';
        const result = await connection.query(sql, [product_name, product_price, product_desc]);
        connection.release();

        response = {
            statusCode: 201,
            body: JSON.stringify({
                status: true,
                data: result.rows[0],
                message: 'Product created successfully',
            }),
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                status: false,
                message: 'some error happened',
            }),
        };
    }
    return response;
};
