<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { eStoreData } from '@/stores/eStoreData';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import AddModalForm from '@/components/utilities/AddModalForm.vue';
import InputText from '@/components/utilities/InputText.vue';
import Button from '@/components/utilities/Button.vue';

const store = eStoreData();
const { categories } = storeToRefs(store);
const categoryId = ref('');
const category = ref('');
const description = ref('');
const columns = store.categoriesColumn;
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAddModal = ref(false);
const sortKey = ref('');
const sortDirection = ref('asc');
const edit = ref(false);

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

const sortedCategories = computed(() => {
  const data = [...filteredCategories.value];
  if (!sortKey.value) return data;

  return data.sort((a, b) => {
    const first = String(a[sortKey.value] ?? '').toLowerCase();
    const second = String(b[sortKey.value] ?? '').toLowerCase();
    const comparison = first.localeCompare(second, undefined, { numeric: true, sensitivity: 'base' });

    return sortDirection.value === 'asc' ? comparison : -comparison;
  })
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedCategories.value.slice(start, end);
});

const handleSearch = (value) => {
  search.value = value;
  currentPage.value = 1;
}

const handleSort = ({ key, direction }) => {
  sortKey.value = key;
  sortDirection.value = direction;
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

const editModal = (data) => {
  showAddModal.value = true;
  categoryId.value = data.id;
  category.value = data.category;
  description.value = data.category_desc;
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

const editCategory = async () => {
  const details = {
    'id': categoryId.value,
    'category': category.value,
    'description': description.value
  }

  await store.editCategory(details);
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
    :sortKey="sortKey"
    :sortDirection="sortDirection"
    @sort="handleSort"
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
           @click="editModal(row)"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" class="text-xl"/>
        </button>
      </div>
    </template>

    <template #pagination>
      <Pagination
        :totalItems="sortedCategories.length"
        @pageChange="handlePageChange"
        @itemsPerPageChange="handleItemsPerPageChange"
      />
    </template>

  </DataTable>

  <AddModalForm
    v-if="showAddModal"
    :cancelButton="true"
    @close="closeAddModal"
  >
    <template #input>
      <InputText
        id="category"
        type="text"
        label="Category"
        placeholder="Category"
        v-model="category"
      />
      <InputText
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
        @click="editCategory"
      />
    </template>
  </AddModalForm>

</template>
