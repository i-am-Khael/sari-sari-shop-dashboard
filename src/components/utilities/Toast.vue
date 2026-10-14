<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'info', 'warn', 'danger', 'error'].includes(value)
  },
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  }
});

const styles = {
  success: {
    classes: 'bg-green-400 text-green-950',
    icon: 'fa-solid fa-circle-check'
  },
  info: {
    classes: 'bg-blue-400 text-blue-950',
    icon: 'fa-solid fa-circle-info'
  },
  warn: {
    classes: 'bg-yellow-400 text-yellow-950',
    icon: 'fa-solid fa-circle-exclamation'
  },
  danger: {
    classes: 'bg-red-400 text-red-950',
    icon: 'fa-solid fa-circle-exclamation'
  },
  error: {
    classes: 'bg-red-400 text-red-950',
    icon: 'fa-solid fa-circle-exclamation'
  },
}

const style = computed(() => styles[props.type] ?? styles.success);
const icon = computed(() => props.icon || style.value.icon);
</script>

<template>
  <Transition name="toast" appear>
  	<div
      v-if="props.show"
  	  class="m-6 p-3 font-semibold tracking-wide absolute top-0 right-0 inline-flex items-center justify-center gap-2 rounded shadow-md"
  		:class="style.classes"
  	>
  	  <FontAwesomeIcon :icon="icon" class="text-2xl"/>
  		<span>{{ props.text }}</span>
  	</div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
