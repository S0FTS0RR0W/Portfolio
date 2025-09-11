<template>
  <AsciiBlock src="/assets/ascii/hero-splash.txt" />
  <section class="welcome">
    <div class="terminal">
      <pre><code>{{ displayed }}</code></pre>
    </div>
    <h1>&lt;Welcome to <span class="highlight">Charlie's Portfolio</span>/&gt;</h1>
    <p>// Web Dev, Programmer and Tinkerer</p>
    <nav>
      <NuxtLink to="/projects">&gt; View Projects</NuxtLink>
      <NuxtLink to="/about">&gt; About Me</NuxtLink>
      <NuxtLink to="/contact">&gt; Contact</NuxtLink>
      <NuxtLink to="/codestats">&gt; Code::Stats</NuxtLink>
      <!-- <NuxtLink to="/deskcam">&gt; Live Print Cam</NuxtLink> -->
    </nav>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const lines = [
  '$ ./start-portfolio.sh',
  '✔ Loading projects...',
  '✔ Fetching latest updates...'
];

const displayed = ref('');
let currentLine = 0;
let currentChar = 0;
let typingInterval;
let isDeleting = false;

function typeLine() {
  if (!isDeleting) {
    if (currentChar < lines[currentLine].length) {
      displayed.value += lines[currentLine][currentChar];
      currentChar++;
      typingInterval = setTimeout(typeLine, 50);
    } else {
      displayed.value += '\n';
      currentLine++;
      currentChar = 0;
      if (currentLine < lines.length) {
        typingInterval = setTimeout(typeLine, 400);
      } else {
        setTimeout(() => {
          isDeleting = true;
          currentLine = 0;
          currentChar = 0;
          typeLine();
        }, 1200);
      }
    }
  } else {
    if (displayed.value.length > 0) {
      displayed.value = displayed.value.slice(0, -1);
      typingInterval = setTimeout(typeLine, 20);
    } else {
      isDeleting = false;
      currentLine = 0;
      currentChar = 0;
      typeLine();
    }
  }
}

onMounted(() => {
  typeLine();
});
</script>

<style scoped>
.welcome {
  font-family: 'Fira Code', monospace;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .welcome {
    padding: 1rem;
    min-height: 100vh;
    font-size: 1rem;
    text-align: center;
  }
  h1 {
    font-size: 1.2rem;
  }
  nav {
    flex-direction: column;
    gap: 0.5rem;
  }
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.highlight {
  color: #58a6ff;
}

nav {
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
}

nav a {
  background: #161b22;
  color: #58a6ff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(20, 20, 20, 0.1);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  border: 1px solid #21262c;
}

nav a:hover {
  background: #238636;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}

p {
  margin-bottom: 2rem;
  color: #8b949e;
}

.terminal {
  background: #161b22;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #c9d1d9;
  width: 340px;
  min-height: 4.5em;
  max-width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

NuxtLink {
  color: #58a6ff;
  text-decoration: none;
  transition: color 0.2s ease;
}

NuxtLink:hover {
  color: #79c0ff;
}
</style>