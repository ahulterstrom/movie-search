<script setup>
import { ref } from "vue";
let input = ref("");
let movies = [];
let loading = false;
async function handleSearch() {
  loading = true;
  movies = await fetch(
    `http://localhost:8000/movies?search=${input.value}`
  ).then((res) => res.json());
  console.log("movies", movies);
  loading = false;
}
</script>
<template>
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-center flex-col">
      <div class="p-4 flex gap-4">
        <input
          class="input flex-auto"
          type="text"
          v-model="input"
          placeholder="Search movies..."
        />
        <button class="btn btn-primary" @click="handleSearch">search</button>
      </div>
      <div class="flex flex-row flex-wrap justify-center">
        <div
          v-for="movie in movies"
          :key="movie.movie_id"
          class="p-4 flex gap-4"
        >
          <div class="card card-side bg-base-100 shadow-xl">
            <figure>
              <img :src="movie.poster_image_url" alt="Movie" class="w-64" />
            </figure>
            <div class="card-body w-48 text-left">
              <h2 class="card-title">{{ movie.title }}</h2>
              <p>{{ movie.popularity_summary }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-outline">Watch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <div
          class="animate-spin radial-progress text-primary"
          style="--value: 50"
        ></div>
      </div>
    </div>
  </div>
</template>
