<template>
  <section class="repo-gallery">
  <h2>&lt;My GitHub Repositories/&gt;</h2>
  <div class="repo-grid">
    <div v-for="repo in repos" :key="repo.id" class="repo-card">
      <h3><a :href="repo.html_url" target="_blank">{{ repo.name }}</a></h3>
      <p>{{ repo.description || 'No description yet' }}</p>
      <span class="language">{{ repo.language || 'Unknown' }}</span>
      <span class="updated">Last updated: {{ new Date(repo.updated_at).toLocaleDateString() }}</span>
    </div>
  </div>
</section>
</template>

<script setup>
import {ref, onMounted } from 'vue'

const repos = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/users/S0FTS0RR0W/repos')
    const data = await res.json()
    repos.value = data.filter(repo => !repo.fork)
  } catch (err) {
    console.error('Failed to fetch repos:', err)
  }
})
</script>

<style scoped>
.repo-gallery {
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
  font-family: 'Fira Code', monospace;
}

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.repo-card {
  background: #161b22;
  border: 1px solid #21262c;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(20, 20, 20, 0.1);
  transition: transform 0.2s ease;
}

.repo-card:hover {
  transform: translateY(-2px) scale(1.02);
  border-color: #238636;
}

.repo-card h3 a {
  color: #58a6ff;
  text-decoration: none;
}

.repo-card p {
  color: #8b949e;
  margin: 0.5rem 0;
}

.language, .updated {
  font-size: 0.8rem;
  color: #8b949e;
  display: block;
  margin-top: 0.25rem;
}
</style>