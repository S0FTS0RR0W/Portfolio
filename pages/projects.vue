<template>
  <AsciiBlock src="/assets/ascii/project-pi-cluster.txt" />
  <AsciiBlock src="/assets/ascii/project-toshiba-trst-a10.txt" />
  <div class="projects">
    <NuxtLink to="/" class="back-button">← Back</NuxtLink>

    <h1>&lt;Projects/&gt;</h1>
    <p class="subtitle">// A collection of my work</p>

    <div class="project-list">
      <NuxtLink to="/projects/project1" class="project-item">
        <h2>Toshiba TRST-A10 Recipt Print Server</h2>
        <ul>
          <li>RESTful API for USB control</li>
          <li>Musical printer hacks</li>
          <li>Pi-based deployment</li>
          <li>Dependency troubleshooting</li>
        </ul>
      </NuxtLink>

      <NuxtLink to="/projects/project2" class="project-item">
        <h2>Project 2</h2>
        <p>A brief description of Project 2.</p>
      </NuxtLink>

      <NuxtLink to="/projects/project3" class="project-item">
        <h2>Project 3</h2>
        <p>A brief description of Project 3.</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.projects {
  font-family: 'Fira Code', monospace;
  background-color: #0d1117;
  color: #c9d1d9;
  padding: 1.5rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.back-button {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #58a6ff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #79c0ff;
}

h1 {
  color: #58a6ff;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #8b949e;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-item {
  background-color: #161b22;
  padding: 1.25rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid #30363d;
}

.project-item:hover {
  background-color: #21262d;
}

.project-item h2 {
  color: #79c0ff;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.project-item p,
.project-item ul {
  color: #8b949e;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-item ul {
  list-style-type: none;
  padding-left: 0;
}

.project-item li::before {
  content: "▸ ";
  color: #58a6ff;
}

/* Responsive tweaks */
@media (max-width: 600px) {
  .projects {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .project-item h2 {
    font-size: 1.1rem;
  }

  .project-item p,
  .project-item ul {
    font-size: 0.9rem;
  }

  .back-button {
    font-size: 0.95rem;
  }
}
</style>