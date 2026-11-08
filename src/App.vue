<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();

onBeforeMount(() => auth.loadCSRF());
</script>

<template>
  <main class="w-dvw h-dvh">
    <RouterView/>
  </main>
</template>
