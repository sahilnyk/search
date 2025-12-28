<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  margin: 24px auto;
  width: 42px;
  height: 42px;
  border: 4px solid #888;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
