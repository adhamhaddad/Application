import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import database from '/opt/nodejs/services/database';

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        // const { user_id } = JSON.parse(event.body as string);
        const connection = await database.connect();
        const sql = 'SELECT * FROM users';
        const result = await connection.query(sql);
        connection.release();
        const sqltest = `
            SELECT DISTINCT u.user_id, u.first_name, u.last_name, p.password, e.ecommerce_id
            FROM users u, email e, password p, ecommerce e
            WHERE
            e.user_id=u.user_id
            AND
            
            AND
            e.email=$1
        `
        const resulttest = await connection.query(sqltest, ['adham@gmail.com'])
        response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE,PUT,HEAD',
            },
            body: JSON.stringify({
                status: true,
                data: result.rows[0],
                message: 'User fetched successfully',
            }),
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                status: false,
                message: err
                ,
            }),
        };
    }
    return response;
};
