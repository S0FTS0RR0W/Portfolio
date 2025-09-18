<template>
  <div class="chatbox">
    <div v-for="(msg, i) in messages" :key="i" class="message">{{ msg }}</div>
    <input
      v-model="userInput"
      @keyup.enter="handleInput"
      placeholder="Ask me about Charlie..."
      class="chat-input"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userInput = ref('')
const messages = ref([])
let data = {}

onMounted(async () => {
  try {
    const res = await fetch('/charlie.json')
    data = await res.json()
  } catch (err) {
    messages.value.push("Error loading Charlie's data.")
  }
})

function handleInput() {
  const input = userInput.value.toLowerCase()
  let response = "Hmm... I don't know that yet."

  if (input.includes("skills")) {
    response = "Charlie's skills: " + data.skills.join(", ")
  } else if (input.includes("interests")) {
    response = "Charlie's interests: " + data.interests.join(", ")
  } else if (input.includes("jellydrop")) {
    response = "JellyDrop: " + data.projects?.JellyDrop
  } else if (input.includes("pulsebox")) {
    response = "PulseBox: " + data.projects?.PulseBox
  } else if (input.includes("philosophy")) {
    response = "Charlie's philosophy: " + data.philosophy
  }

  messages.value.push("> " + userInput.value)
  messages.value.push(response)
  userInput.value = ''
}
</script>

<style scoped>
.chatbox {
  background: #0f0f0f;
  color: #aaffcc;
  font-family: 'Fira Code', monospace;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
  border: 1px solid rgba(88, 166, 255, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.chatbox:hover {
  box-shadow: 0 0 30px rgba(88, 166, 255, 0.4);
  border-color: rgba(88, 166, 255, 0.5);
}

.chat-input {
  width: 100%;
  padding: 0.75rem;
  background: #1f1f1f;
  color: #aaffcc;
  border: none;
  border-top: 1px solid #333;
  font-size: 1rem;
  outline: none;
  transition: background 0.3s ease;
}

.chat-input:focus {
  background: #2a2a2a;
}

.message {
  margin: 0.5rem 0;
  line-height: 1.4;
  animation: fadeIn 0.3s ease;
}

.message::before {
  content: "$ ";
  color: #58a6ff;
  margin-right: 4px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>