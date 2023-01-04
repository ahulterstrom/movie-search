const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const port = process.env.PORT;
const token = process.env.API_KEY;

const axiosConfig = {
  headers: { Authorization: `Bearer ${token}` },
};

app.get("/movies", async (req, res) => {
  const query = req.query.search;

  const data = await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&region=US&query=${query}`,
      axiosConfig
    )
    .catch((err) => console.error("error"));

  const formattedData = data?.data?.results.slice(0,10).map((movie) => {
    return {
      movie_id: movie.id,
      title: movie.title,
      poster_image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      popularity_summary: `${movie.popularity} out of ${movie.vote_count}`,
    };
  });
  res.send(formattedData);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
