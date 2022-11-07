const { response } = require("express");
const database = require("./database");

const getUsers = (request, response) => {
  //Past challenges
  /* database
    .query("select * from users")
    .then(([users]) => {
      response.json(users);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error retrieving data from database");
    }); */

  //Current chalenge: Express 6- GET in detail
  let sql = "select * from users";
  const sqlValues = [];

  if (request.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(request.query.language);
  }
  if (request.query.city != null) {
    sql += " where city = ?";
    sqlValues.push(request.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      response.json(users);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (request, response) => {
  const id = parseInt(request.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        response.json(users[0]);
      } else {
        response.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error retrieving data from database");
    });
};

const postUser = (request, response) => {
  const { firstname, lastname, email, city, language } = request.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      response.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error saving the user");
    });
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);

  const { firstname, lastname, email, city, language } = request.body;

  database.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
    [firstname, lastname, email, city, language, id]
      .then(([result]) => {
        if (result.affectedRows === 0) {
          response.status(404).send("Not Found");
        } else {
          response.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send("Error");
      })
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  database
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        response.status(404).send("Not Found");
      } else {
        response.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send("Error");
    });
};
module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
};
