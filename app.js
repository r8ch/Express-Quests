require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json()); // add this line

const port = process.env.APP_PORT ?? 5000;

const welcome = (request, response) => {
  response.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateUser, validateMovie } = require("./validator");

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.insertMovie);
app.delete("/api/movies/:id", validateMovie, movieHandlers.deleteMovie);

const userHandler = require("./userHandler");

app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUsersById);
app.post("/api/users", validateUser, userHandler.postUser);
app.put("/api/users/:id", validateUser, userHandler.updateUser);
app.delete("/api/users/:id", userHandler.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
