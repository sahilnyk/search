<template>
  <div class="item" tabindex="0" @click="toggle" @keydown.enter="toggle">
    <h3>{{ item.title }}</h3>
    <p>{{ item.snippet }}</p>
    <transition name="fade">
      <div v-if="open" class="details">
        {{ item.details }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({ item: Object });
const open = ref(false);
function toggle() { open.value = !open.value; }
</script>

<style>
.item {
  border: 1px solid var(--border);
  background: var(--card);
  padding: 16px;
  border-radius: 12px;
  margin: 10px 0;
  cursor: pointer;
  transition: .25s;
}
.item:hover { transform: translateY(-1px); }
.item:focus { outline: 2px solid #4a90e2; }
.details { margin-top: 8px; color: #9f9f9f; }
.fade-enter-active,
.fade-leave-active { transition: opacity .3s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
