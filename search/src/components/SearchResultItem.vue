<template>
  <div class="item" tabindex="0" @click="toggle" @keydown.enter="toggle">
    <div class="row">
      <div class="title-wrap">
        <h3>{{ item.title }}</h3>
        <p class="snippet">{{ item.snippet }}</p>
      </div>

      <i class="ri-arrow-down-s-line arrow" :class="{ open }"></i>
    </div>

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
  padding: 18px 20px;
  border-radius: 18px;
  background: var(--card);
  border: 1px solid var(--border);
  transition: .25s;
}

.item + .item {
  margin-top: 18px;
}

.item:hover {
  transform: translateY(-2px);
  border-color: rgba(255,255,255,.28);
}

.title-wrap {
  max-width: 92%;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.snippet {
  opacity: .72;
  font-size: 14px;
  line-height: 1.5;
}

.details {
  margin-top: 16px;
  opacity: .9;
  line-height: 1.55;
}

.arrow {
  font-size: 22px;
  transition: .3s;
  opacity: .8;
}

.open {
  transform: rotate(180deg);
}

.fade-enter-active,
.fade-leave-active { transition: opacity .25s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
