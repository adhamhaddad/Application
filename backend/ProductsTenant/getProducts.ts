import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { pgDatabase } from 'database';
import hello from '/opt/nodejs/hello';

export const getProducts = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        // const connection = await pgDatabase.connect();
        // const sql = 'SELECT * FROM products';
        // const result = await connection.query(sql);
        // connection.release();
        response = {
            statusCode: 200,
            body: JSON.stringify({
                status: true,
                data: hello(),
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
