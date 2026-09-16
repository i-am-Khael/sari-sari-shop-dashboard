 <script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  mainText: {
    type: String,
    default: 'Main Text'
  },
  subText: {
    type: String,
    default: 'Sub Text'
  },
  cancelButton: Boolean,
  default: false
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
    class="w-full h-full fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-slate-950/40"
    @click="handleOverlay"
  >
    <div class="w-full max-w-125 relative overflow-hidden rounded bg-slate-50 shadow-2xl">

      <div class="px-4 py-4 relative flex items-center bg-linear-to-r from-blue-950 to-blue-800">
        <div>
          <h2 class="text-lg font-semibold text-slate-50">{{ props.mainText }}</h2>
          <p class="mt-1 text-sm text-blue-100">{{ props.subText }}</p>
        </div>
        <button
          type="button"
          aria-label="Close add category form."
          class="py-1 text-3xl absolute top-0 right-0 inline-flex items-center justify-center text-blue-100 hover:text-red-400 cursor-pointer"
          @click="closeModal"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark"/>
        </button>
      </div>

      <form
        class="p-4 flex flex-col gap-3"
        @submit.prevent
      >
        <slot name="input"/>
        <div class="w-full flex items-center justify-center gap-3">
          <slot name="buttons"/>
            <button
              class="w-full p-2 text-slate-50 rounded bg-red-400 hover:bg-red-500 cursor-pointer"
              v-if="props.cancelButton"
              @click="closeModal"
            >
              Cancel
            </button>
        </div>
      </form>

    </div>
  </section>
</template>
