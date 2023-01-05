<script setup>
import { ref } from "vue";
let input = ref("");
let movies = ref([]);
let loading = ref(false);
let hasSearched = ref(false);
async function handleSearch() {
  loading.value = true;
  hasSearched.value = true;
  movies = await fetch(
    `http://localhost:8000/movies?search=${input.value}`
  ).then((res) => res.json());
  loading.value = false;
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
    </div>
  </div>
  <div class="flex justify-center">
    <div v-if="!loading">
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
        <div v-if="movies.length === 0">
          <h2 class="text-center text-xl my-20">
            {{ hasSearched ? "No movies found" : "Search for a movie" }}
          </h2>
        </div>
      </div>
    </div>
    <div v-if="loading" class="my-20">
      <div
        class="animate-spin radial-progress text-primary"
        style="--value: 50"
      ></div>
    </div>
  </div>
</template>
