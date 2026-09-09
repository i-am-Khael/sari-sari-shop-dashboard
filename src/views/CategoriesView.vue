<script setup>
  import AddModalComponent from '@/components/categories/AddModalComponent.vue';
  import CategoriesTableComponent from '@/components/categories/CategoriesTableComponent.vue';
</script>

<template>
  <div class="w-auto h-full flex flex-col gap-5">
    <AddModalComponent/>
    <CategoriesTableComponent/>
  </div>
</template>
