<template>
  <div class="container">
    <header class="header">
      <h2 class="title">Search</h2>

      <button class="theme-btn" @click="toggleTheme">
        <i v-if="theme==='light'" class="ri-moon-line"></i>
        <i v-else class="ri-sun-line"></i>
      </button>
    </header>

    <p class="hint">
      <kbd>\</kbd> expand search • <kbd>Enter</kbd> expand item
    </p>

    <div class="search-area">
      <SearchBar ref="searchBarRef" @search="handleSearch" />
    </div>

    <transition name="fade">
      <Loader v-if="loading" />
    </transition>

    <transition name="fade">
      <p v-if="!loading && !results.length && typed" class="no-results">
        No results found
      </p>
    </transition>

    <transition-group name="list" tag="div">
      <SearchResultList v-if="paginated.length" :results="paginated" />
    </transition-group>

    <div v-if="results.length" class="pagination">
      <button @click="prev" :disabled="page===1">
        <i class="ri-arrow-left-s-line"></i>
      </button>

      <span>{{ page }} / {{ totalPages }}</span>

      <button @click="next" :disabled="page===totalPages">
        <i class="ri-arrow-right-s-line"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Loader from "../components/Loader.vue";
import SearchResultList from "../components/SearchResultList.vue";
import { fetchSearchResults } from "../services/searchService.js";

const results = ref([]);
const loading = ref(false);
const typed = ref(false);
const theme = ref("dark");
const searchBarRef = ref(null);
const page = ref(1);
const limit = 5;

const totalPages = computed(() => Math.ceil(results.value.length / limit));
const paginated = computed(() =>
  results.value.slice((page.value - 1) * limit, page.value * limit)
);

function prev() { if(page.value>1) page.value--; }
function next() { if(page.value<totalPages.value) page.value++; }

function expandShortcut(e) {
  if (e.key === "\\") {
    e.preventDefault();
    searchBarRef.value?.expand();
  }
}

onMounted(() => {
  document.addEventListener("keydown", expandShortcut);
  applyTheme();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", expandShortcut);
});

function applyTheme() {
  document.body.className = theme.value;
}

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  applyTheme();
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
    page.value = 1;
  } finally {
    loading.value = false;
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..900&display=swap');
@import url('https://cdn.jsdelivr.net/npm/remixicon@4.4.0/fonts/remixicon.css');

body {
  font-family: Inter, system-ui, sans-serif;
  transition: background .5s ease, color .5s ease;
}

body.dark {
  --bg: #000;
  --dot: rgba(255,255,255,.08);
  --card: rgba(255,255,255,.07);
  --text: #fff;
  --border: rgba(255,255,255,.18);
  --input: rgba(255,255,255,.1);
}

body.light {
  --bg: #f6f6ff;
  --dot: rgba(0,0,0,.08);
  --card: #fff;
  --text: #111;
  --border: rgba(0,0,0,.12);
  --input: rgba(255,255,255,.8);
}

body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  background-image:
    radial-gradient(var(--dot) 1px, transparent 1px),
    radial-gradient(var(--dot) 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 36px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  letter-spacing: .5px;
  font-weight: 700;
  transform: translateY(2px);
}

.theme-btn {
  padding: 9px 12px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card);
  cursor: pointer;
  color: var(--text);
  transition: .3s ease;
}
.theme-btn:hover {
  transform: scale(1.05);
}

.hint {
  opacity: .8;
  margin: 8px 0 6px 0;
  font-size: 14px;
}

.search-area {
  margin-top: 12px;
  margin-bottom: 36px;
}

kbd {
  background: rgba(0,0,0,.6);
  color: white;
  padding: 4px 7px;
  border-radius: 6px;
}

.no-results {
  opacity: .6;
  margin-top: 30px;
  text-align: center;
}

.pagination {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 34px;
}

.pagination button {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  cursor: pointer;
  transition: .25s ease;
}
.pagination button:hover:not(:disabled) {
  transform: translateY(-2px);
}
.pagination button:disabled {
  opacity: .3;
  cursor: not-allowed;
}
.pagination span {
  opacity: .75;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all .35s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 600px) {
  .container { padding: 18px; }
  .title { font-size: 20px; }
}
</style>
