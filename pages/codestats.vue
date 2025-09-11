<template>
  <div class="codestats-chart">
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="title">charlie@codestats:~$./mystats.sh</span>
    </div>

    <div class="terminal-body">
      <NuxtLink to="/" class="back-button">← cd ..</NuxtLink>
      <p class="cli-line">// Most Used Languages</p>
      <ClientOnly>
        <Pie :data="chartData" :options="chartOptions" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = ref({
  labels: [
    'Vue', 'JavaScript', 'Python', 'JavaScript (JSX)', 'TypeScript (JSX)',
    'Plain text', 'TypeScript', 'CSS', 'C++', 'HTML', 'Other',
  ],
  datasets: [
    {
      label: 'XP',
      data: [54582, 6654, 4496, 4055, 3861, 1745, 1312, 989, 507, 352, 1111],
      backgroundColor: [
        '#41b883', '#f7df1e', '#3572A5', '#61dafb', '#3178c6',
        '#cccccc', '#007acc', '#2965f1', '#f34b7d', '#e34c26', '#888888',
      ],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#c9d1d9',
        font: { family: 'Fira Code', size: 14 },
      },
    },
    title: {
      display: true,
      text: 'XP by Language',
      color: '#c9d1d9',
      font: { family: 'Fira Code', size: 18 },
    },
  },
});
</script>

<style scoped>
.codestats-chart {
  max-width: 700px;
  margin: 2rem auto;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  color: #c9d1d9;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.title {
  margin-left: auto;
  font-size: 0.9rem;
  color: #8b949e;
}

.terminal-body {
  padding: 1rem;
}

.cli-line {
  font-size: 0.95rem;
  color: #8b949e;
  margin-bottom: 1rem;
}

canvas {
  min-height: 300px;
}

.back-button {
  display: inline-block;
  margin-bottom: 1rem;
  color: #58a6ff;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #79c0ff;
}
</style>