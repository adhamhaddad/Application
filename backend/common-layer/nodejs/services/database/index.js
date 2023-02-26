"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const database = new pg_1.Pool({
    host: 'aws-tests.cwxgo9fu0u1h.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'aws_tests',
    user: 'postgres',
    password: 'postgres',
});
exports.default = database;
