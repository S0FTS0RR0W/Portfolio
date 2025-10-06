<template>
  <header class="portfolio-header">
    <div class="name">
      <Icon icon="mdi:account-circle" width="24" />
      Charlie
    </div>
    <nav class="nav-links">
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
    </nav>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.portfolio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(13, 17, 23, 0.8);
  border-bottom: 1px solid #30363d;
  backdrop-filter: blur(6px);
  font-family: 'Fira Code', monospace;
}

.name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #58a6ff;
}

.nav-links {
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
</style>