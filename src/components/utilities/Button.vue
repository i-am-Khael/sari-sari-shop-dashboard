<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
  type: String,
  label: String,
  buttonIcon: {
    type: Boolean,
    default: false
  },
  sortIcon: {
    type: Boolean,
    default: false
  },
  iconName: String,
  add: {
    type: String,
    default: "w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
  },
  cancel: {
    type: String,
    default: "w-full p-2 text-slate-50 rounded bg-red-400 hover:bg-red-500 cursor-pointer"
  },
  customClass: String
})
</script>

<template>
<button
  type="button"
  :class="props.customClass ? props.customClass : props.type === 'add' ? props.add : props.cancel"
>
  <FontAwesomeIcon v-if="props.buttonIcon" :icon="props.iconName"/>
  <span>{{ props.label }}</span>
  <FontAwesomeIcon v-if="props.sortIcon" :icon="props.iconName"/>
</button>
</template>
