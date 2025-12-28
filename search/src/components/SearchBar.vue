<template>
  <input v-model="text" @input="emitQuery" class="search-input" placeholder="Search..." />
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["search"]);
const text = ref("");
let timer = null;

function emitQuery() {
  clearTimeout(timer);
  timer = setTimeout(() => emit("search", text.value), 350);
}
</script>

<style>
.search-input {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  outline: none;
}
.search-input:focus {
  border-color: #4a90e2;
}
</style>
