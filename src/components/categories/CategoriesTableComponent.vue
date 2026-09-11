
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { eStoreData } from '@/stores/eStoreData';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const store = new eStoreData();
const categories = ref([]);
const search = ref('');
const sortField = ref(null);
const sortDirection = ref('asc');
const currentPage = ref(1);
const itemsPerPage = ref(5);
const itemsPerPageOptions = [5, 10, 25, 50];



const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
}

const deleteCategory = async (id) => {
  await store.deleteCategory(id);
  await store.getAllCategories();
  categories.value = [...store.categories];
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}

const previousPage = (page) => {
  if (currentPage.value > 1) currentPage.value--;
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

const filteredCategories = computed(() => {
  const term = search.value.trim().toLowerCase();

  const filtered = categories.value.filter((category) => {
    const categoryValue = String(category.category ?? '').toLocaleLowerCase();
    const descriptionValue = String(category.category_desc ?? '').toLocaleLowerCase();

    if (term === '') return true;

    return (
      categoryValue.includes(term) ||
      descriptionValue.includes(term)
    );
  });

  if (!sortField.value) return filtered;

  return [...filtered].sort((a, b) => {
    const field = sortField.value;
    const valueA = field === 'category' ? a.category ?? '' : a.category_desc ?? '';
    const valueB = field === 'category' ? b.category ?? '' : b.category_desc ?? '';
    const result = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
    return sortDirection.value === 'asc' ? result : -result;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage.value);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

watch([search, itemsPerPage], () => {
  currentPage.value = 1;
});

onMounted(async () => {
  await store.getAllCategories();
  categories.value = [...store.categories];
});
</script>

<template>

  <div class="w-full p-5 flex flex-col gap-4 rounded bg-linear-to-r from-blue-950 to-blue-800 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
        E-Store Dashboard
      </p>
      <h1 class="text-2xl font-bold tracking-tight text-white">
        Categories
      </h1>
      <p class="mt-1 text-sm text-blue-100">
        Manage your product categories.
      </p>
    </div>

    <button
      type="button"
      class="px-6 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 rounded shadow-sm text-blue-950 bg-blue-50 hover:bg-blue-900 hover:text-slate-50 cursor-pointer"
    >
      <FontAwesomeIcon icon="fa-solid fa-plus"/>
      <span>Add Category</span>
    </button>
  </div>

  <div class="overflow-scroll rounded-md border border-slate-200 bg-white">
    <div class="overflow-x-auto">

      <table class="w-full">

        <thead class="sticky top-0 bg-linear-to-r from-blue-950 to-blue-800">
          <tr class="text-left text-sm uppercase tracking-wider text-white">
            <th
              class="px-6 py-4 font-semibold cursor-pointer hover:bg-blue-700"
              @click="sortBy('category')"
            >
              <div class="flex items-center gap-2">
                <span>Category</span>
                <FontAwesomeIcon
                  class="text-blue-200"
                  :icon="sortField === 'category' && sortDirection === 'asc' ? 'fa-solid fa-arrow-down-a-z' : 'fa-solid fa-arrow-up-z-a'"
                />
              </div>
            </th>
            <th class="px-6 py-4 font-semibold">Description</th>
            <th class="px-6 py-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            class=" hover:bg-gray-300"
            v-for="category in paginatedCategories"
            :key="category.id"
          >
            <td class="whitespsce-nowrap px-6 py-4">
              <span class="font-semibold text-blue-900" >
                {{ category.category }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600">
              {{ category.category_desc }}
            </td>
            <td class="px-6 py-4 flex justify-center gap-2">
              <button
                type="button"
                class="px-4 py-2 cursor-pointer rounded text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                type="button"
                disabled
                class="px-4 py-2 cursor-pointer rounded text-sm font-medium text-white bg-red-400 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                @click="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>


      <div class="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div class="flex items-center gap-2 text-sm text-slate-600">
          <label for="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            class="rounded border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-pointer"
            v-model.number="itemsPerPage"
          >
            <option
              v-for="option in itemsPerPageOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <span>per page</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-2 text-sm font-medium rounded text-slate-50 bg-blue-900 hover:bg-bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            :disabled="currentPage === 1"
            @click="previousPage()"
          >
            Previous
          </button>

          <button
            type="button"
            class="h-9 min-w-9 px-3 text-sm font-medium rounded cursor-pointer"
            v-for="page in totalPages"
            :key="page"
            :class="currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-300 bg-white text-slate-600 hover:bg-blue-700 hover:text-slate-50'"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            class="px-3 py-2 text-sm font-medium rounded text-slate-50 bg-blue-900 hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            :disabled="currentPage === totalPages || totalPages === 0"
            @click="nextPage()"
          >
            Next
          </button>
        </div>

      </div>


    </div>
  </div>
</template>
