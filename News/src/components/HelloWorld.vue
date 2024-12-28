<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-6 sm:py-10 px-4 sm:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-indigo-400 text-center">📰 Top Headlines</h1>

    <!-- Country selector (optional, for mobile) -->
    <div class="w-full max-w-xs mb-6 sm:mb-8">
      <select
        v-model="selectedCountry"
        class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="us">US</option>
        <option value="in">India</option>
        <option value="gb">UK</option>
        <!-- Add more countries as needed -->
      </select>
    </div>

    <!-- Button to fetch headlines -->
    <div class="w-full max-w-2xl flex justify-center mb-6 sm:mb-8">
      <button
        @click="getTopHeadlines"
        class="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg w-full sm:w-auto transition duration-300"
      >
        Fetch Top Headlines
      </button>
    </div>

    <!-- Loading and Error States -->
    <div v-if="isLoading" class="text-indigo-400 text-lg font-medium mt-4 text-center">
      Loading...
    </div>
    <div v-if="error" class="text-red-500 text-lg font-medium mt-4 text-center">
      {{ error }}
    </div>

    <!-- Articles List -->
    <ul v-if="articles.length" class="w-full max-w-4xl space-y-6 mt-6">
      <li
        v-for="(article, index) in articles"
        :key="index"
        class="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 sm:p-6"
      >
        <h3 class="text-xl font-semibold mb-2 text-indigo-400">
          {{ article.title }}
        </h3>
        <p class="text-gray-300 mb-4">
          {{ article.description }}
        </p>
        <a
          :href="article.url"
          target="_blank"
          class="text-indigo-500 hover:text-indigo-400 underline"
        >
          Read More
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchTopHeadlines } from '@/newsapi';

// Reactive variables
const selectedCountry = ref<string>('us'); // Default country
const articles = ref<any[]>([]); // Store top headlines
const isLoading = ref<boolean>(false); // Loading state
const error = ref<string | null>(null); // Error state

// Function to fetch top headlines
const getTopHeadlines = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const data = await fetchTopHeadlines(selectedCountry.value); // Pass selected country
    articles.value = data.articles;
  } catch (err) {
    error.value = 'Failed to load top headlines.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button,
a {
  transition: all 0.3s ease-in-out;
}
</style>
