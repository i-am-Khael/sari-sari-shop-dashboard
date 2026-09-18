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
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: String,
    default: 'id'
  },
  itemLabel: {
    type: String,
    default: 'label'
  },
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
  selectClass: {
    type: String,
    default: "w-full px-3 py-2.5 text-sm text-slate-800 outline-none rounded border border-slate-300 bg-slate-50 placeholder:text-slate-400 focus:border-blue-600 apperance-none cursor-pointer"
  },
  accept: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  fileClass: {
    type: String,
    default: "w-full text-sm text-slate-800 block border border-slate-300 rounded bg-slate-50 focus:outline-none file:mr-4 file:px-2 file:py-2 file:border-0 file-text-sm file:font-semibold file:text-slate-50 file:bg-blue-800 hover:file:bg-blue-700 cursor-pointer"
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
    type: [String, File, Array, Object],
    default: ''
  }
});


const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
}

const updateFile = (event) => {
  const files = event.target.files;
  if (props.multiple) {
    emit('update:modelValue', Array.from(files));
  } else {
    emit('update:modelValue', files?.[0] ?? null);
  }
}

</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="props.label" :class="props.labelClass" :for="props.for">
      {{ props.label }}
    </label>

    <input
      v-if="props.type === 'text'"
      :class="props.inputClass"
      :id="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :value="props.modelValue"
      @input="updateValue"
    />

    <input
      v-if="props.type === 'file'"
      :class="props.fileClass"
      :id="props.id"
      :type="props.type"
      :disabled="props.disabled"
      :required="props.required"
      :accept="props.accept"
      :multiple="props.multiple"
      @change="updateFile"
    >

    <select
      v-if="props.type === 'select'"
      :class="props.selectClass"
      :id="props.id"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :value="props.modelValue"
      @change="updateValue"
    >
      <option value="">{{ props.placeholder || 'Select an option...' }}</option>
      <option
        v-for="item in props.items"
        :key="item[props.itemValue]"
        :value="item[props.itemValue]"
      >
        {{ item[props.itemLabel] }}
      </option>
    </select>

    <textarea
      v-if="props.type === 'textarea'"
      :class="props.textAreaClass"
      :id="props.id"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :cols="props.cols"
      :rows="props.rows"
      :value="props.modelValue"
      @input="updateValue"
    ></textarea>
  </div>
</template>
