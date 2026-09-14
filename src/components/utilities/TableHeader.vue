<script setup>
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from './Button.vue';
import InputText from './InputText.vue';

const props = defineProps({
  headerText: {
    type: String,
    required: true
  },
  mainText: {
    type: String,
    required: true
  },
  subText: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
});

const emit = defineEmits([
  'search',
  'openModal'
]);

const search = ref('');

const openModal = () => {
  emit('openModal');
}

watch(search, (value) => {
  emit('search', value);
});
</script>

<template>
	<div class="w-full p-4 flex items-center justify-between bg-linear-to-r from-blue-950 to-blue-800">

	  <div>
      <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-200">{{ props.headerText }}</p>
      <h1 class="text-2xl font-bold tracking-tight text-white">{{ props.mainText }}</h1>
      <p class="mt-1 text-sm text-blue-100">{{ props.subText }}</p>
    </div>

		<div class="flex items-center gap-3">
      <div class="relative">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
        <InputText
          id="search"
          type="text"
          inputClass="w-full py-2 pl-10 pr-4 text-sm rounded  bg-slate-50"
          :placeholder="props.placeholder"
          v-model="search"
        />
      </div>
      <Button
        customClass="px-6 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 rounded shadow-sm text-blue-950 bg-blue-50 hover:bg-blue-900 hover:text-slate-50 cursor-pointer"
        label="Add Category"
        iconName="fa-solid fa-plus"
        :buttonIcon="true"
        @click="openModal"
      />
    </div>

	</div>
</template>
