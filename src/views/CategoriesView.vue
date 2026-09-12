<script setup>
import CategoriesTableComponent from '@/components/categories/CategoriesTableComponent.vue';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';

import { ref } from 'vue';
import { eStoreData } from '@/stores/eStoreData';
import { onMounted } from 'vue';
const store = eStoreData();
// const categories = ref([]);

const columns = [
  {
    'key': 'category',
    'label': 'Category',
  },
  {
    'key': 'category_desc',
    'label': 'Description',
  },
];

const categories = [
  {
    'id': 1,
    'category': 'A',
    'category_desc': 'Category',
  },
  {
    'id': 2,
    'category': 'B',
    'category_desc': 'Category',
  },
  {
    'id': 3,
    'category': 'C',
    'category_desc': 'Category',
  },
  {
    'id': 4,
    'category': 'D',
    'category_desc': 'Category',
  },
  {
    'id': 5,
    'category': 'E',
    'category_desc': 'Category',
  },
  {
    'id': 6,
    'category': 'F',
    'category_desc': 'Category',
  },
  {
    'id': 7,
    'category': 'G',
    'category_desc': 'Category',
  },
];

onMounted(async () => {
  await store.getAllCategories();
  categories.value = store.categories;
});
</script>

<template>

  <DataTable
    :columns="columns"
    :rows="categories"
  >

     <template #header>
      <TableHeader
        headerText="E-Store Dashboard"
        mainText="Categories"
        subText="Manage your product categories."
        placehoder="Search categories..."
      />
    </template>

    <template #actions="{ data }">
      <div class="flex items-center justify-center gap-3">
        <button>Add</button>
        <button>Edit</button>
      </div>
    </template>

    <template #pagination>
      <Pagination :totalPages="categories.length" />
    </template>

  </DataTable>

</template>
