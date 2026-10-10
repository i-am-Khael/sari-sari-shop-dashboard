<script setup>
const props = defineProps({
  class: String,
  msg: String
});
</script>

<template>
  <small v-if="props.msg" :class="props.class">{{ props.msg }}</small>
</template>
