<template>
  <div class="burger-wrapper">
    <button class="burger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <transition name="slide">
      <nav v-if="isOpen" class="mobile-nav">
        <NuxtLink to="/projects" @click="closeMenu">Projects</NuxtLink>
        <NuxtLink to="/about" @click="closeMenu">About</NuxtLink>
        <NuxtLink to="/contact" @click="closeMenu">Contact</NuxtLink>
      </nav>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const closeMenu = () => (isOpen.value = false)
</script>

<style scoped>
.burger-wrapper {
  display: none;
}

.burger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0.5rem;
}

.burger span {
  width: 24px;
  height: 2px;
  background-color: #c9d1d9;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.burger span.open:nth-child(2) {
  opacity: 0;
}
.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-nav {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #0d1117;
  border-left: 1px solid #30363d;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .burger-wrapper {
    display: block;
  }
}
</style>