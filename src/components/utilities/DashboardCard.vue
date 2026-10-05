<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  icon: {
    type: String,
    default: 'fa-solid fa-box-open',
    required: true
  },
  iconColor: {
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
  iconClass: {
    type: String,
    default: 'text-5xl text-blue-900'
  },
  mainTextClass: {
    type: String,
    default: 'font-extrabold text-3xl text-blue-50'
  },
  subTextClass: {
    type: String,
    default: 'text-sm text-blue-100 font-semibold tracking-wider'
  },
  customClass: {
    type: String,
    default: 'bg-linear-to-b from-blue-900 to-blue-700'
  }
});
</script>

<template>
	<div class="p-5 rounded shadow-md" :class="props.customClass">
	  <div class="inline-flex items-center justify-center gap-4">
		  <FontAwesomeIcon :icon="props.icon" :class="props.iconClass"/>
			<div>
     	  <p :class="props.mainTextClass">{{ props.mainText }}</p>
    		<p :class="props.subTextClass">{{ props.subText }}</p>
			</div>
		</div>
	</div>
</template>
