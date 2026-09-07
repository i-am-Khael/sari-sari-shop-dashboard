<script setup>
  import { ref } from 'vue';
  import SideNavComponent from './components/SideNavComponent.vue';
  const showSideNav = ref(true);
  const toggleSideNav = () => showSideNav.value = !showSideNav.value;
</script>

<template>
  <main
    class="min-w-dvw min-h-dvh grid bg-gray-300"
    :class="showSideNav ? 'grid-cols-[300px_1fr]' : 'grid-cols-1'"
  >
    <SideNavComponent v-if="showSideNav"/>
    <section class="w-full h-screen overflow-scroll p-4" @click="toggleSideNav">
      <RouterView/>
    </section>
  </main>
</template>
