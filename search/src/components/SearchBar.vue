<template>
  <div class="search-wrapper" :class="{ expanded: expanded }">
    <i class="ri-search-line icon"></i>
    <input
      id="searchBox"
      v-model="text"
      @input="emitQuery"
      class="search-input"
      placeholder="Search anything..."
    />
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const emit = defineEmits(["search"]);
const text = ref("");
let timer;
const expanded = ref(false);

function emitQuery() {
  clearTimeout(timer);
  timer = setTimeout(() => emit("search", text.value), 250);
}

function expand() {
  expanded.value = true;
  document.getElementById("searchBox")?.focus();
}

defineExpose({ expand });
</script>

<style>
.search-wrapper {
  position: relative;
  width: 260px;
  transition: width .35s ease;
}
.search-wrapper.expanded {
  width: 100%;
}
.icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  opacity: .85;
}
.search-input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--input);
  color: var(--text);
  outline: none;
  font-size: 15px;
}
.search-input:focus {
  border-color: #7c4dff;
}
</style>
