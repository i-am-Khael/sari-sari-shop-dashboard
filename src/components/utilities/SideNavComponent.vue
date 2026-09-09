<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <section class="max-w-75 h-screen p-6 text-[#f5f5f5] bg-blue-950">

    <h1 class="flex gap-2 items-center justify-center text-2xl">
      <FontAwesomeIcon icon="fa-solid fa-box" class="text-green-500"/>
      <span>E-Store Dashboard</span>
    </h1>

    <ul class="flex flex-col justify-center gap-2.5 mt-5">
     	<li class="flex gap-2 items-center hover:text-green-500">
        <RouterLink exact-active-class="text-green-500 font-semibold" to="/">
          <FontAwesomeIcon icon="fa-solid fa-chart-pie"/>
          Dashboard
        </RouterLink>
      </li>
     	<li class="flex gap-2 items-center hover:text-green-500">
        <RouterLink exact-active-class="text-green-500 font-semibold" to="/products">
          <!-- <FontAwesomeIcon icon=""/> -->
          Products
        </RouterLink>
      </li>
     	<li class="flex gap-2 items-center hover:text-green-500">
        <RouterLink exact-active-class="text-green-500 font-semibold" to="/categories">
          <!-- <FontAwesomeIcon icon=""/> -->
          Categories
        </RouterLink>
      </li>
    </ul>

  </section>
</template>
