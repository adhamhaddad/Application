import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { pgDatabase } from 'database';

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const { product_id } = JSON.parse(event.body as string);
        const connection = await pgDatabase.connect();
        const sql = 'DELETE FROM products WHERE product_id=$1 RETURNING *';
        const result = await connection.query(sql, [product_id]);
        connection.release();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                status: true,
                data: result.rows[0],
                message: 'Product deleted successfully',
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
