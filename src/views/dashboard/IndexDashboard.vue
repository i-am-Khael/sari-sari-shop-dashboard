<script setup>
import { ref } from 'vue';
import SideNavComponent from '@/components/SideNavComponent.vue';
const showSideNav = ref(true);
</script>

<template>
<section
  class="w-dvw h-dvh grid bg-gray-300"
  :class="showSideNav ? 'grid-cols-[300px_1fr]' : 'grid-cols-1'"
>
  <SideNavComponent v-if="showSideNav"/>
  <div class="w-full h-screen overflow-x-hidden p-3">
    <RouterView/>
  </div>
</section>
</template>
