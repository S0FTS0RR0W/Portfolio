<template>
  <header class="portfolio-header">
    <div class="name">Charlie</div>
    <nav class="nav-links">
      <NuxtLink to="/projects">Projects</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
    </nav>
  </header>
</template>

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
  font-size: 1.4rem;
  font-weight: bold;
  color: #58a6ff;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  font-weight: 500;
  color: #c9d1d9;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #58a6ff;
}
</style>