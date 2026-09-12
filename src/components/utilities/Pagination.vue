<script setup>
import { ref } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    default: 1,
    required: true
  }
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [5, 10, 25, 50];


const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}

const previousPage = (page) => {
  if (currentPage.value > 1) currentPage.value--;
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

</script>

<template>
<div class="p-4 flex items-center justify-between gap-4 border-t border-slate-400 bg-slate-50">

  <div class="flex items-center gap-2 text-sm text-slate-600">
    <label for="itemsPerPage">Show:</label>
    <select
      id="itemsPerPage"
      class="px-3 py-2 text-sm rounded outline outline-slate-400 focus:outline-blue-800 cursor-pointer disabled:cursor-not-allowed"
      :disabled="props.totalPages === 0"
      v-model.number="itemsPerPage"
    >
      <option
        v-for="option in itemsPerPageOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <span>per page</span>
  </div>

  <div class="flex items-center gap-2">
    <button
      type="button"
      class="px-3 py-2 text-sm font-medium rounded text-slate-50 bg-blue-900 hover:bg-bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      :disabled="currentPage === 1"
      @click="previousPage()"
    >
      Previous
    </button>

    <button
      type="button"
      class="h-9 min-w-9 px-3 text-sm font-medium rounded cursor-pointer"
      v-for="page in props.totalPages"
      :key="page"
      :class="currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-300 bg-white text-slate-600 hover:bg-blue-700 hover:text-slate-50'"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="px-3 py-2 text-sm font-medium rounded text-slate-50 bg-blue-900 hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      :disabled="currentPage === props.totalPages || props.totalPages === 0"
      @click="nextPage()"
    >
      Next
    </button>
  </div>

</div>
</template>
