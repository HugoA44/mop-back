const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "109.234.161.196",
  port: "3306",
  user: "djdw4398_mdp",
  password: "BG3AH6PeTQRxpqk",
  database: "djdw4398_mdp",
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
