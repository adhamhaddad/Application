"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var database = new pg_1.Pool({
    host: '',
    port: 5432,
    database: 'aws_tests',
    user: 'postgres',
    password: 'postgres'
});
exports["default"] = database;
