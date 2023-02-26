import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import database from '/opt/nodejs/services/database';

export const updateProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const { product_id, product_name, product_price, product_desc } = JSON.parse(event.body as string);
        const connection = await database.connect();
        const sql =
            'UPDATE products SET product_name=$1, product_price=$2, product_desc=$3 WHERE product_id=$4 RETURNING *';
        const result = await connection.query(sql, [product_name, product_price, product_desc, product_id]);
        connection.release();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                status: true,
                data: result.rows[0],
                message: 'Product updated successfully',
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
