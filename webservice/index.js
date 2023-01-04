const express = require('express');
const dotenv = require('dotenv'); 
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT;
const token = process.env.API_KEY;

console.log('token', token)


const axiosConfig = {
  headers: { Authorization: `Bearer ${token}` }
};

app.get('/', async (req, res) => {
  const data = await axios.get( 
    'https://api.themoviedb.org/3/movie/76341',
    axiosConfig
    ).catch(err => console.error('error'))
  const movie = data.data;
  res.send(movie);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});