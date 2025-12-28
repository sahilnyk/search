<template>
  <div>
    <SearchResultItem v-for="r in results" :key="r.id" :item="r" />
  </div>
</template>

<script setup>
import SearchResultItem from "./SearchResultItem.vue";
defineProps({ results: Array });
</script>
