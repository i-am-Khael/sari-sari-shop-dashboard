<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import { useDataTable } from '@/composables/useDataTable';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TableHeader from '@/components/utilities/TableHeader.vue';
import DataTable from '@/components/utilities/DataTable.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import FormModal from '@/components/utilities/FormModal.vue';
import TextInputs from '@/components/utilities/TextInputs.vue';
import Button from '@/components/utilities/Button.vue';

const store = useCategoriesStore();
const { categories } = storeToRefs(store);
const categoryId = ref('');
const category = ref('');
const description = ref('');
const columns = store.columns;
const showAddModal = ref(false);
const errors = ref(null);

const {
  currentPage,
  itemsPerPage,
  sortKey,
  sortDirection,
  sortedItems,
  paginatedItems,
  handleSearch,
  handleSort,
  handlePageChange,
  handleItemsPerPageChange
} = useDataTable(categories, {
  searchFields: ['category', 'description'],
  itemsPerPage: 10,
});

const openAddModal = () => {
  showAddModal.value = true;
}

const editModal = (data) => {
  showAddModal.value = true;
  categoryId.value = data.id;
  category.value = data.category;
  description.value = data.description;
}

const closeAddModal = () => {
  categoryId.value = '';
  category.value = '';
  description.value = '';
  errors.value = null;
  showAddModal.value = false;
}

const addCategory = async () => {

  const data = {
    'category': category.value,
    'description': description.value
  }

  const results = await store.addCategory(data);

  if (results.status !== 200) {
    errors.value = results.errors;
    return;
  }

  closeAddModal();
}

const updateCategory = async () => {
  const data = {
    'id': categoryId.value,
    'category': category.value,
    'description': description.value
  }

  const results = await store.updateCategory(data);

  if (results.status !== 200) {
    errors.value = results.errors;
    return;
  }

  closeAddModal();
}

onMounted(async () => {
  await store.getAllCategories();
});
</script>

<template>
  <DataTable
    :columns="columns"
    :rows="paginatedItems"
    :sortKey="sortKey"
    :sortDirection="sortDirection"
    @sort="handleSort"
  >

    <template #header>
      <TableHeader
        headerText="E-Store Dashboard"
        mainText="Categories"
        subText="Manage your product categories."
        label="Add Category"
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
           @click="editModal(row)"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" class="text-xl"/>
        </button>
      </div>
    </template>

    <template #pagination>
      <Pagination
        :totalItems="sortedItems.length"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @pageChange="handlePageChange"
        @itemsPerPageChange="handleItemsPerPageChange"
      />
    </template>

  </DataTable>

  <FormModal
    v-if="showAddModal"
    mainText="Categories"
    :subText="categoryId ? 'Update a product category.' : 'Create a new product category.'"
    :cancelButton="true"
    @close="closeAddModal"
  >
    <template #input>
      <TextInputs
        id="category"
        type="text"
        label="Category"
        placeholder="Category"
        :hasError="errors?.category"
        :errorMsg="errors?.category"
        v-model="category"
      />
      <TextInputs
        id="description"
        type="textarea"
        label="Description"
        placeholder="Description"
        v-model="description"
      />
    </template>
    <template #buttons>
      <Button
        v-if="!categoryId"
        customClass="w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
        label="Add"
        @click="addCategory"
      />
      <Button
        v-else
        customClass="w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
        label="Update"
        @click="updateCategory"
      />
    </template>
  </FormModal>

</template>
