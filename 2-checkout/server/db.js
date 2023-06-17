require("dotenv").config();
const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(100) UNIQUE,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100),
        shipping_address_1 VARCHAR(100),
        shipping_address_2 VARCHAR(100),
        shipping_city VARCHAR(100),
        shipping_state VARCHAR(2),
        shipping_zip INT,
        billing_cc VARCHAR(100),
        billing_exp_month INT,
        billing_exp_year INT,
        billing_cvv INT,
        billing_zip INT,
        stage INT DEFAULT 2,
        order_completed TINYINT DEFAULT 0
        )`
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
