<template>
  <div class="container">
    <header class="header">
      <h2>Smart Search</h2>
      <button class="theme-btn" @click="toggleTheme">
        {{ theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode' }}
      </button>
    </header>

    <p class="hint">
      <kbd>Enter</kbd> expand <kbd>↑</kbd><kbd>↓</kbd> navigate
    </p>

    <SearchBar @search="handleSearch" />

    <Loader v-if="loading" />

    <p v-if="!loading && !results.length && typed">No results found</p>

    <SearchResultList v-if="results.length" :results="results" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Loader from "../components/Loader.vue";
import SearchResultList from "../components/SearchResultList.vue";
import { fetchSearchResults } from "../services/searchService.js";

const results = ref([]);
const loading = ref(false);
const typed = ref(false);
const theme = ref("light");

onMounted(() => {
  document.documentElement.classList.toggle("dark", theme.value === "dark");
});

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.classList.toggle("dark");
}

async function handleSearch(q) {
  typed.value = true;
  if (!q) {
    results.value = [];
    return;
  }
  loading.value = true;
  try {
    results.value = await fetchSearchResults(q);
  } finally {
    loading.value = false;
  }
}
</script>

<style>
:root {
  --bg: #ffffff;
  --card: #f5f5f5;
  --text: #111;
  --border: #ddd;
}

.dark {
  --bg: #0f172a;
  --card: #111827;
  --text: #fafafa;
  --border: #333;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: .3s;
}

.container {
  max-width: 750px;
  margin: auto;
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  cursor: pointer;
}

.hint {
  margin: 14px 0;
  opacity: .8;
  font-size: 14px;
}

kbd {
  background: #000;
  color: white;
  padding: 4px 7px;
  border-radius: 6px;
  margin: 0 2px;
  font-size: 13px;
}
</style>
