<script setup>
const props = defineProps({
  for: String,
  label: String,
  labelClass: {
    type: String,
    default: "text-sm font-semibold text-slate-700",
  },
  id: String,
  name: String,
  type: String,
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: true
  },
  inputClass: {
    type: String,
    default: "w-full px-3 py-2.5 text-sm text-slate-800 rounded outline-none border border-slate-300 placeholder:text-slate-400 focus:border-blue-600",
  },
  cols: {
    type: String,
    default: "9",
  },
  rows: {
    type: String,
    default: "5",
  },
  textAreaClass: {
    type: String,
    default: "w-full px-3 py-2.5 text-sm text-slate-800 resize-none outline-none rounded border border-slate-300 bg-slate-50 placeholder:text-slate-400 focus:border-blue-600",
  },
  modelValue: {
    type: String,
    default: ''
  }
});


const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
}

</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="props.label" :class="props.labelClass" :for="props.for">
      {{ props.label }}
    </label>

    <input
      v-if="props.type !== 'textarea'"
      :class="props.inputClass"
      :id="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :require="props.required"
      :value="props.modelValue"
      @input="updateValue"
    />

    <textarea
      v-else="props.type === 'textarea'"
      :class="props.textAreaClass"
      :id="props.id"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :require="props.required"
      :cols="props.cols"
      :rows="props.rows"
      :value="props.modelValue"
      @input="updateValue"
    ></textarea>
  </div>
</template>
