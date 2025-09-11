<template>
  <AsciiBlock src="/assets/ascii/about-me.txt" />
  <section class="about">
    <NuxtLink to="/" class="back-button">
      ← cd ..<span class="cursor">|</span>
    </NuxtLink>

    <h1 class="heading">$whoami</h1>
    <p class="intro">
      I'm Charlie — a pragmatic developer, hardware hacker, and privacy-first builder.  
      I craft resilient systems, modular portfolios, and playful tech with purpose.
    </p>

    <div class="details">
      <h2>$skills</h2>
      <ul>
        <li>🛠 Linux server troubleshooting (Debian, Proxmox)</li>
        <li>📞 VoIP systems (3CX SBC, remote provisioning)</li>
        <li>⚙️ Cross-platform dev (Electron, React Native, Flutter)</li>
        <li>🌐 Nuxt, SEO, modular web design</li>
        <li>🔐 Privacy-first architecture & secure storage</li>
      </ul>

      <h2>$interests</h2>
      <ul>
        <li>🎛 Terminal-inspired UI & developer aesthetics</li>
        <li>🧩 Creative hardware manipulation</li>
        <li>📡 Ethical tech & discoverable branding</li>
      </ul>

      <h2>$links</h2>
      <ul>
        <li>
          🧮 <NuxtLink to="/codestats" target="_blank" rel="noopener" class="external-link">
            Code::Stats profile
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import AsciiBlock from '~/components/AsciiBlock.vue';

useHead({
  title: 'About — s0fts0rr0w',
  meta: [
    { name: 'description', content: 'Learn more about Charlie — developer, hardware hacker, and privacy-first builder behind s0fts0rr0w.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<style scoped>
.about {
  padding: 2rem;
  font-family: 'Fira Code', monospace;
  color: #c9d1d9;
  max-width: 800px;
  margin: auto;
}

.back-button {
  display: inline-block;
  margin-bottom: 2rem;
  color: #58a6ff;
  font-weight: bold;
  text-decoration: none;
}

.cursor {
  animation: blink 1s steps(2, start) infinite;
  margin-left: 4px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

.heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #79c0ff;
}

.intro {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.details h2 {
  margin-top: 2rem;
  color: #58a6ff;
}

.details ul {
  list-style: none;
  padding-left: 0;
}

.details li {
  margin: 0.5rem 0;
}

.external-link {
  color: #58a6ff;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.external-link:hover {
  color: #79c0ff;
}
</style>