<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

onMounted(() => auth.loadCSRF());
</script>

<template>
  <main class="w-dvw h-dvh">
    <RouterView/>
  </main>
</template>
