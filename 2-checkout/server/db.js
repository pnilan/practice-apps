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
  .then(() => {
    db.queryAsync(
      'DROP TABLE IF EXISTS responses'
    )
  })
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(100),
        name VARCHAR(100),
        email VARCHAR(100),
        password_hash VARCHAR(100),
        shipping_address_1 VARCHAR(100),
        shipping_address_2 VARCHAR(100),
        shipping_city VARCHAR(100),
        shipping_state VARCHAR(2),
        shipping_zip INT,
        billing_cc INT,
        billing_exp_month INT,
        billing_exp_year INT,
        billing_cvv INT,
        billing_zip INT,
        ordered_completed TINYINT DEFAULT 0
        )`
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
