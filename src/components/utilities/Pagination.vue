 <script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
});

const emit = defineEmits([
  'pageChange',
  'itemsPerPageChange'
]);

const itemsPerPageOptions = [5, 10, 25, 50];

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('pageChange', page);
  }
}

const previousPage = (page) => {
  if (props.currentPage > 1) emit('pageChange', props.currentPage - 1);
}

const nextPage = () => {
  if (props.currentPage < totalPages.value) emit('pageChange', props.currentPage + 1);
}

const changeItemPerChange = (event) => {
  const value = Number(event.target.value);
  emit('itemsPerPageChange', value);
  emit('pageChange', 1);
}

watch(
  () => [
    props.totalItems,
    props.itemsPerPage
  ],
  () => {
    const pageCount = Math.max(totalPages.value, 1);
    if (props.currentPage > pageCount) emit('pageChange', pageCount);
  }
);
</script>

<template>
<div class="p-4 flex items-center justify-between gap-4 border-t border-slate-400 bg-slate-50">

  <div class="flex items-center gap-2 text-sm text-slate-600">
    <label for="itemsPerPage">Show:</label>
    <select
      id="itemsPerPage"
      class="px-3 py-2 text-sm rounded outline outline-slate-400 focus:outline-blue-800 cursor-pointer disabled:cursor-not-allowed"
      :disabled="totalPages === 0"
      :value="itemsPerPage"
      @change="changeItemPerChange"
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
      :disabled="currentPage <= 1"
      @click="previousPage"
    >
      Previous
    </button>

    <button
      type="button"
      class="h-9 min-w-9 px-3 text-sm font-medium rounded cursor-pointer"
      v-for="page in totalPages"
      :key="page"
      :class="currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-300 bg-white text-slate-600 hover:bg-blue-700 hover:text-slate-50'"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="px-3 py-2 text-sm font-medium rounded text-slate-50 bg-blue-900 hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      :disabled="currentPage === totalPages || currentPage >= totalPages"
      @click="nextPage"
    >
      Next
    </button>
  </div>

</div>
</template>
