<script setup>
</script>

<template>
<div
  class="mb-5 flex w-full flex-col gap-4 rounded-xl bg-gradient-to-r from-blue-950 to-blue-800 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"
>
  <div>
    <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
      Store management
    </p>

    <h1 class="text-2xl font-bold uppercase tracking-tight text-white">
      Categories
    </h1>
  </div>

  <button
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-blue-950 shadow-md transition duration-200 hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
  >
    <FontAwesomeIcon icon="fa-solid fa-plus" />
    <span>Add Category</span>
  </button>
</div>

</template>
