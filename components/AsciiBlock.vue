<template>
    <pre class="ascii" v-html="art"></pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({ src: String})
const art = ref('')

onMounted(async () => {
    const response = await fetch(props.src)
    art.value = await response.text()
})
</script>

<style scoped>
.ascii {
  font-family: monospace;
  white-space: pre;
  line-height: 1.2;
  color: #ccc;
  padding: 1rem;
}
</style>