<script setup>
const props = defineProps({
  class: String,
  msg: String
})
</script>

<template>
  <small :class="props.class">{{ props.msg }}</small>
</template>
