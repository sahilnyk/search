<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  margin: 26px auto;
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255,255,255,.2);
  border-top: 4px solid #8b5cf6;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
