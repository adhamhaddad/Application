import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import database from '/opt/nodejs/services/database';

export const getProducts = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const connection = await database.connect();
        const sql = 'SELECT * FROM products';
        const result = await connection.query(sql);
        connection.release();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                status: true,
                data: result.rows,
                message: 'Products fetched successfully',
            }),
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                status: false,
                message: err,
            }),
        };
    }
    return response;
};
