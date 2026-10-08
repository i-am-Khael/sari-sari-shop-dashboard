<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DataTable from '../utilities/DataTable.vue';

const path = import.meta.env.VITE_API_STORAGE;

const props = defineProps({
  orders: {
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
}

const handleOverlay = (event) => {
  if (event.target === event.currentTarget) closeModal();
}
</script>

<template>
  <section
    class="w-full h-full absolute overflow-x-auto top-0 left-0 z-50 flex items-center justify-center backdrop-blur-xs bg-slate-950/40"
    @click="handleOverlay"
  >

    <div class="w-[60%] p-6 rounded bg-slate-200">
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl tracking-wide text-slate-800">Purchased Items</h2>
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            class="text-3xl text-red-500 hover:text-red-600 cursor-pointer"
            @click="emit('close')"
          />
        </div>
        <h3 class="mt-2 text-slate-600">
          <span class="text-slate-950">Reference Id:</span> {{ props.orders.reference_id }}
        </h3>
      </div>
      <DataTable
        :columns="props.columns"
        :rows="props.orders.items"
      >
        <template #filename="{ row }">
          <img
            class="w-15 h-15"
            :src="row.filename ? `${path}products/${row.filename}` : `${path}default.png`"
            :alt="row.product"
          >
        </template>
      </DataTable>
    </div>

  </section>
</template>
