require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json()); // add this line

const port = process.env.APP_PORT ?? 5000;

const welcome = (request, response) => {
  response.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.insertMovie);

const userHandler = require("./userHandler");
app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersById);
app.post("/api/users", userHandler.postUser);
app.put("/api/users/:id", userHandler.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
