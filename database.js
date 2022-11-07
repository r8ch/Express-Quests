//At the very top, we need to require the dotenv package and run config().
//This will set for us all the environment variables we defined in the .env file.
require("dotenv").config();

//Then, import the mysql2 package :
const mysql = require("mysql2/promise");

//Finally use mysql.createPool to prepare a connection pool using the environment variables you've just created :
const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//You can try to get a first connection from the pool to check everything is ok :
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

// //
// database
//   .query("select * from movies")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// //
// database
//   .query("select * from movies")
//   .then((result) => {
//     const movies = result[0];
//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = database;
