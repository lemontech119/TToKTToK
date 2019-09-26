const mysql = require('mysql');
const connection = mysql.createPool({
host: 'localhost',
port: 3306,
user: 'root',
password: '124578',
database: 'database'
});

module.exports=connection;
