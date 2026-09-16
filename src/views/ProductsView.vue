<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';
import { useDataTable } from '@/composables/useDataTable';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import FormModal from '@/components/utilities/FormModal.vue';
import InputText from '@/components/utilities/InputText.vue';
import Button from '@/components/utilities/Button.vue';

const store = useProductsStore();
const categoriesStore = useCategoriesStore();
const { products, errors } = storeToRefs(store);
const { categories } = storeToRefs(categoriesStore);
const columns = store.columns;
const showModal = ref(false);

const productId = ref('');
const product = ref('');
const category = ref('');
const price = ref('');
const stock = ref('');
const description = ref('');
const image = ref(null);

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
} = useDataTable(products, {
  searchFields: ['product', 'category', 'description'],
  itemsPerPage: 10
});


const openModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
}

const addProduct = async () => {
  console.log(image.value);
}


const updateProduct = async () => {

}

onMounted(() => {
  store.getAllProducts();
  categoriesStore.getAllCategories();
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
        mainText="Products"
        subText="Manage your product items."
        label="Add Products"
        placeholder="Search products..."
        @search="handleSearch"
        @openModal="openModal"
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
    v-if="showModal"
    mainText="Products"
    :subText="productId ? 'Update a product item.' : 'Create a new product item.'"
    :cancelButton="true"
    @close="closeModal"
  >
    <template #input>
      <InputText
        id="product"
        type="text"
        label="Product"
        placeholder="Product"
        v-model="product"
      />

      <InputText
        id="category"
        type="select"
        label="Category"
        placeholder="Category"
        itemValue="id"
        itemLabel="category"
        :items="categories"
        v-model="category"
      />

      <div class="w-full flex items-center justify-between gap-4">
        <InputText
          id="price"
          type="text"
          label="Price"
          placeholder="Price"
          v-model="price"
        />
        <InputText
          id="stock"
          type="text"
          label="Stock"
          placeholder="Stock"
          v-model="stock"
        />
      </div>

      <InputText
        id="description"
        type="textarea"
        label="Description"
        placeholder="Description"
        v-model="description"
      />

      <InputText
        id="image"
        type="file"
        label="Product Image"
        accept="image/png, image/jpeg, image/webp"
        v-model="image"
      />
    </template>

    <template #buttons>
      <Button
        v-if="!productId"
        customClass="w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
        label="Add"
        @click="addProduct"
      />
      <Button
        v-else
        customClass="w-full p-2 text-slate-50 rounded bg-blue-800 hover:bg-blue-700 cursor-pointer"
        label="Update"
        @click="updateProduct"
      />
    </template>

  </FormModal>

</template>
