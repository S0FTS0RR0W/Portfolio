<template>
  <header class="portfolio-header">
    <!-- Left: Name -->
    <div class="name">
      <Icon icon="mdi:account-circle" width="24" />
      S0FTS0RR0W
    </div>

    <!-- Center: Desktop Navigation -->
    <nav class="nav-links desktop-only">
      <NuxtLink to="/projects">
        <Icon icon="mdi:briefcase-outline" width="20" />
        Projects
      </NuxtLink>
      <NuxtLink to="/about">
        <Icon icon="mdi:information-outline" width="20" />
        About
      </NuxtLink>
      <NuxtLink to="/contact">
        <Icon icon="mdi:email-outline" width="20" />
        Contact
      </NuxtLink>
      <NuxtLink to="/codestats">
        <Icon icon="mdi:code-block-parentheses" width="20" />
        Code::Stats
      </NuxtLink>
    </nav>

    <!-- Right: Burger Menu -->
    <button class="burger" @click="toggleMenu">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <!-- Mobile Navigation -->
    <transition name="slide">
      <nav v-if="isOpen" class="mobile-nav">
        <NuxtLink to="/projects" @click="closeMenu">
          <Icon icon="mdi:briefcase-outline" width="20" />
          Projects
        </NuxtLink>
        <NuxtLink to="/about" @click="closeMenu">
          <Icon icon="mdi:information-outline" width="20" />
          About
        </NuxtLink>
        <NuxtLink to="/contact" @click="closeMenu">
          <Icon icon="mdi:email-outline" width="20" />
          Contact
        </NuxtLink>
        <NuxtLink to="/codestats" @click="closeMenu">
          <Icon icon="mdi:code-block-parentheses" width="20" />
          Code::Stats
        </NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const closeMenu = () => (isOpen.value = false)
</script>

<style scoped>
.portfolio-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(13, 17, 23, 0.8);
  border-bottom: 1px solid #30363d;
  backdrop-filter: blur(6px);
  font-family: 'Fira Code', monospace;
  position: relative;
}

.name {
  grid-column: 1;
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #58a6ff;
}

.desktop-only {
  grid-column: 2;
  justify-self: center;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  color: #c9d1d9;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #58a6ff;
}

.burger {
  grid-column: 3;
  justify-self: end;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  width: 48px;
  height: 48px;
  z-index: 20;
}

.burger span {
  width: 24px;
  height: 2px;
  background-color: #c9d1d9;
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: center;
}

.burger span.open:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}
.burger span.open:nth-child(2) {
  opacity: 0;
}
.burger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

.mobile-nav {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #0d1117;
  border-left: 1px solid #30363d;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
}

.mobile-nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #c9d1d9;
  text-decoration: none;
}

.mobile-nav a:hover {
  color: #58a6ff;
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
  .desktop-only {
    display: none;
  }
  .burger {
    display: flex;
  }
}
</style>