const { response } = require("express");
const database = require("./database");

const getUsers = (request, response) => {
  database
    .query("select * from users")
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

module.exports = {
  getUsers,
  getUsersById,
};
