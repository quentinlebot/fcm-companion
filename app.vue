<template>
  <NuxtPage />
</template>

<script setup>
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
</script>

<style>
@font-face {
  font-family: 'Kansas';
  src: url('/fonts/Kansas-Casual-Bold.otf') format('opentype');
}

.kansas {
  font-family: 'Kansas', sans-serif;
}
</style>
