<script setup>
import { ref } from "vue";
let input = ref("");
let movies = [];
async function handleSearch() {
  movies = await fetch(
    `http://localhost:8000/movies?search=${input.value}`
  ).then((res) => res.json());
}
</script>
<template>
  <div>
    <input type="text" v-model="input" placeholder="Search movies..." />
    <button @click="handleSearch">search</button>
  </div>
  <div v-for="movie in movies" :key="movie.movie_id">
    <p>{{ movie.title }}</p>
  </div>
</template>
