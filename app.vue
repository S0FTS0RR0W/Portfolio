<template>
  <div v-if="asciiMode">
    <PortfolioHeader />
    <AsciiBlock src="/assets/ascii/site-wrapper.txt" />
    <NuxtPage />
  </div>
  <div v-else>
    <PortfolioHeader />
    <NuxtPage transition="fade" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PortfolioHeader from '~/components/PortfolioHeader.vue'

const asciiMode = ref(true)
</script>

<style>
html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Fira Code', monospace;
  background-color: #0d1117;
  color: #c9d1d9;
  margin: 0;
  padding: 0;
}
* {
  box-sizing: inherit;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

@media (max-width: 600px) {
  body {
    font-size: 1rem;
    padding: 0.5rem;
  }
}
</style>