<template>
  <div class="contact-page">
    <NuxtLink to="/" class="back-button">
      ← cd ..<span class="cursor">|</span>
    </NuxtLink>
    <h1>&lt;Contact/&gt;</h1>
    <p class="subtitle">// Reach out to me</p>
    <div class="contact-content">
      <p>If you want to contact me, fill out the form below and I'll reply as soon as possible.</p>
      <form @submit.prevent="handleSubmit" class="cli-form">
      <label for="name">&gt; name:</label>
      <input type="text" v-model="form.name" name="name" id="name" required aria-label="Name" />
      <label for="email">&gt; email:</label>
      <input type="email" v-model="form.email" name="email" id="email" required aria-label="Email" />
      <label for="message">&gt; message:</label>
      <textarea v-model="form.message" name="message" id="message" rows="5" required aria-label="Message"></textarea>
        <!-- Cloudflare Turnstile widget -->
  <div id="turnstile-widget" style="margin-bottom: 1rem;"></div>
  <button type="submit">&gt; send</button>
      </form>
      <div class="terminal-output">
        <p v-if="status === 'sending'">&gt; Sending message<span class="blink">...</span></p>
        <p v-if="status === 'success'">
          &gt; <span>{{ typedMessage }}<span v-if="showCursor" class="blink-cursor">|</span></span>
        </p>
        <p v-if="status === 'error'">&gt; {{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const status = ref('')
const fullMessage = "Message sent successfully. I'll be in touch.";
const typedMessage = ref("");
const showCursor = ref(true);
let cursorInterval;
const errorMessage = ref('Error sending message. Try again later.');

const turnstileToken = ref('');
let turnstileWidgetId = null;

function renderTurnstile() {
  // Remove previous widget if exists
  const widgetDiv = document.getElementById('turnstile-widget');
  if (widgetDiv) widgetDiv.innerHTML = '';
  if (window.turnstile) {
    turnstileWidgetId = window.turnstile.render('#turnstile-widget', {
      sitekey: '0x4AAAAAABtrg3rKDg2sCUGL',
      callback: (token) => {
        turnstileToken.value = token;
      },
    });
  }
}

onMounted(() => {
  if (!document.getElementById('cf-turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      renderTurnstile();
    };
  } else {
    nextTick(() => renderTurnstile());
  }
});

watch(status, (val) => {
  if (val === 'success') {
    typedMessage.value = "";
    showCursor.value = true;
    let i = 0;
    const interval = setInterval(() => {
      typedMessage.value += fullMessage[i];
      i++;
      if (i >= fullMessage.length) {
        clearInterval(interval);
        cursorInterval = setInterval(() => {
          showCursor.value = !showCursor.value;
        }, 500);
      }
    }, 30);
    // Reset form
    form.value = { name: '', email: '', message: '' };
    // Reset Turnstile
    nextTick(() => renderTurnstile());
    turnstileToken.value = '';
  } else {
    showCursor.value = false;
    clearInterval(cursorInterval);
  }
});

const handleSubmit = async () => {
  if (!turnstileToken.value) {
    errorMessage.value = 'Please complete the CAPTCHA.';
    status.value = 'error';
    return;
  }
  status.value = 'sending';
  try {
    const res = await fetch('https://formspree.io/f/xdkdroqz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        turnstile_token: turnstileToken.value,
      }),
    });
    if (res.ok) {
      status.value = 'success';
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Error sending message. Try again later.';
      status.value = 'error';
    }
  } catch {
    errorMessage.value = 'Error sending message. Try again later.';
    status.value = 'error';
  }
}
</script>

<style scoped>
.contact-page {
  font-family: 'Fira Code', monospace;
  background-color: #0d1117;
  color: #c9d1d9;
  padding: 1.5rem;
  min-height: 100vh;
  box-sizing: border-box;
}
.back-button {
  display: inline-block;
  margin-bottom: 1rem;
  color: #58a6ff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.back-button:hover {
  color: #1f6feb;
}
h1 {
  margin-top: 0;
  font-size: 2.2rem;
}
.subtitle {
  color: #8b949e;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.contact-content {
  background: #161b22;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
.cli-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
.cli-form input,
.cli-form textarea,
.cli-form button {
  background-color: #0d1117;
  color: #c9d1d9;
  border: 1px solid #30363d;
  padding: 0.75rem;
  font-size: 1rem;
}
.cli-form button {
  cursor: pointer;
  transition: background 0.2s;
}
.cli-form button:hover {
  background-color: #21262d;
}
.terminal-output {
  margin-top: 1rem;
  color: #58a6ff;
}
/* Fix typo and remove duplicate keyframes */
.cursor {
  animation: blink-cursor 1s steps(2, start) infinite;
  margin-left: 4px;
}

@keyframes blink-cursor {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
@media (max-width: 600px) {
  .contact-page {
    font-size: 1rem;
    padding: 0.5rem;
  }
  .contact-content {
    padding: 1rem;
  }
}
/* Blinking cursor for typing effect */
.blink-cursor {
  display: inline-block;
  width: 1ch;
  animation: blink-cursor 1s steps(1) infinite;
}
</style>