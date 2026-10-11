<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();
const auth = useAuthStore();

const handleLogout = async () => {
  await auth.logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <aside class="h-screen px-4 py-6 flex flex-col shrink-0 bg-linear-to-b from-blue-950 via-blue-900 to-blue-800 text-white shadow-xl cursor-pointer">

    <div class="mb-8 px-2 pb-6 border-b border-blue-800/70">
      <div class="flex items-center gap-3">

        <div class="h-11 w-11 flex items-center justify-center rounded bg-white/10 shadow-inner ring-1 ring-white/20">
          <FontAwesomeIcon icon="fa-solid fa-box" class="text-xl text-blue-200"/>
        </div>

        <div>
          <h1 class="text-lg font-bold tracking-light">Sari-Sari-Shop</h1>
          <p class="text-xs font-medium uppercase tracking-widest text-blue-200">Dashboard</p>
        </div>

      </div>
    </div>

    <nav class="flex flex-col gap-2">
      <RouterLink
        to="/dashboard"
        exact-active-class="bg-white text-blue-950 shadow-md"
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chart-pie"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink
        to="/dashboard/categories"
        exact-active-class="bg-white text-blue-950 shadow-md"
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-table-list"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Categories</span>
      </RouterLink>
      <RouterLink
        to="/dashboard/products"
        exact-active-class="bg-white text-blue-950 shadow-md"
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-boxes-stacked"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Products</span>
      </RouterLink>
      <RouterLink
        to="/dashboard/orders"
        exact-active-class="bg-white text-blue-950 shadow-md"
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-layer-group"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Orders</span>
      </RouterLink>
    </nav>

    <div class="mt-auto">
      <!-- <RouterLink
        to="/profile"
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-user-tie"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Profile</span>
      </RouterLink> -->
      <div
        class="px-4 py-3 text-sm font-medium group flex items-center gap-3 rounded hover:bg-white/10 hover:text-white transition-all duration-200"
        @click="handleLogout"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-solid fa-arrow-right-from-bracket"
          class="w-5 text-blue-300 group-hover:text-white transition"
        />
        <span>Logout</span>
      </div>
    </div>

  </aside>
</template>
