import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import database from '/opt/nodejs/services/database';

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const { username, email, password, phone, country, currency, lang, domain } = JSON.parse(event.body as string);
        const connection = await database.connect();
        const user_SQL = 'INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) WHERE NOT EXISTS (SELECT * FROM users WHERE username=$1, email=$2, phone=$1) RETURNING *';
        const store_SQL = 'INSERT INTO store (user_id, country, currency, lang, domain) VALUES ($1, $2, $3, $4, $5)';
        const sq = ''

        const user_result = await connection.query(user_SQL, [username, email, password, phone]);
        const store_result = await connection.query(store_SQL, [
            user_result.rows[0].user_id,
            country,
            currency,
            lang,
            domain,
        ]);

        connection.release();

        response = {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE,PUT,HEAD',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: true,
                data: { ...user_result.rows[0], ...store_result.rows[0] },
                message: 'User created successfully',
            }),
        };
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                status: false,
                err: err,
                message: err,
            }),
        };
    }
    return response;
};
