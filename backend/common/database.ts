import {Pool} from 'pg';

const database = new Pool({
    host: '',
    port: 5432,
    database: 'aws_tests',
    user: 'postgres',
    password: 'postgres'
})
export default database;
