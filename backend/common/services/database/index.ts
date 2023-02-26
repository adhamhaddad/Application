import { Pool } from 'pg';

const database = new Pool({
    host: 'aws-tests.cwxgo9fu0u1h.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'aws_tests',
    user: 'postgres',
    password: 'postgres',
});
export default database;
