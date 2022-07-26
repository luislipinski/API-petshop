const Pool = require('pg').Pool;

const pool = new Pool({
    user: "petmaster",
    host: "localhost",
    database: "petshop",
    password: "teste123",
    port: 5432,
});

module.exports = pool;