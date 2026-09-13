<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { eStoreData } from '@/stores/eStoreData';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import AddModalForm from '@/components/utilities/AddModalForm.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const store = eStoreData();
const columns = store.categoriesColumn;
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAddModal = ref(false);

const { categories } = storeToRefs(store);
const category = ref('');
const description = ref('');

const filteredCategories = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return categories.value;

  return categories.value.filter((category) => {
    return (
      String(category.category ?? '')
        .toLowerCase()
        .includes(query) ||
      String(category.category_desc ?? '')
        .toLowerCase()
        .includes(query)
    );
  });
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

const handleSearch = (value) => {
  search.value = value;
  currentPage.value = 1;
}

const handlePageChange = (page) => {
  currentPage.value = page;
}

const handleItemsPerPageChange = (page) => {
  itemsPerPage.value = page;
  currentPage.value = 1;
}


const openAddModal = () => {
  showAddModal.value = true;
}

const closeAddModal = () => {
  showAddModal.value = false;
}

const addCategory = async () => {
  await store.addCategory({
    'category': category.value,
    'description': description.value
  });
}

onMounted(async () => {
  await store.getAllCategories();
  categories.value = store.categories;
});
</script>

<template>
  <DataTable
    :columns="columns"
    :rows="paginatedCategories"
  >

     <template #header>
      <TableHeader
        headerText="E-Store Dashboard"
        mainText="Categories"
        subText="Manage your product categories."
        placeholder="Search categories..."
        @search="handleSearch"
        @openModal="openAddModal"
      />
    </template>

    <template #actions="{ row }">
      <div class="flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Edit a category."
          class="text-blue-500 hover:text-blue-800 cursor-pointer"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" class="text-xl"/>
        </button>
      </div>
    </template>

    <template #pagination>
      <Pagination
        :totalItems="filteredCategories.length"
        @pageChange="handlePageChange"
        @itemsPerPageChange="handleItemsPerPageChange"
      />
    </template>

  </DataTable>

  <AddModalForm
    v-if="showAddModal"
    @close="closeAddModal"
    cancel="true"
  >
    <template #input>
      <div class="flex flex-col gap-1.5">
        <label for="category" class="text-sm font-semibold text-slate-700">Category</label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          required
          class="w-full px-3 py-2.5 text-sm text-slate-800 rounded outline-none border border-slate-300 placeholder:text-slate-400 focus:border-blue-600"
          v-model="category"
        >
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="description" class="text-sm font-semibold text-slate-700">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          required
          class="w-full px-3 py-2.5 text-sm text-slate-800 resize-none outline-none rounded border border-slate-300 bg-slate-50 placeholder:text-slate-400 focus:border-blue-600"
          v-model="description"
        >
        </textarea>
      </div>
    </template>
    <template #buttons>
      <button
        class="w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
        @click="addCategory"
      >
        Add
      </button>
    </template>
  </AddModalForm>

</template>
