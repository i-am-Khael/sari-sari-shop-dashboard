<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { useCategoriesStore } from '@/stores/categories';
import { useDataTable } from '@/composables/useDataTable';
import { utilities } from '@/composables/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import FormModal from '@/components/utilities/FormModal.vue';
import TextInputs from '@/components/utilities/TextInputs.vue';
import Button from '@/components/utilities/Button.vue';

const path = import.meta.env.VITE_STORAGE_PATH;
const store = useProductsStore();
const categoriesStore = useCategoriesStore();
const { products } = storeToRefs(store);
const { categories } = storeToRefs(categoriesStore);
const columns = store.columns;
const showModal = ref(false);
const productId = ref('');
const product = ref('');
const category = ref('');
const price = ref('');
const formattedPrice = ref('');
const stock = ref('');
const description = ref('');
const image = ref(null);
const preview = ref(null);
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
} = useDataTable(products, {
  searchFields: ['product', 'category', 'description'],
  itemsPerPage: 10
});

const { formatMoney } = utilities();


const resetModal = () => {
  productId.value = '';
  product.value = '';
  category.value = '';
  price.value = '';
  stock.value = '';
  description.value = '';
  image.value = null;
  preview.value = null;
}

const openModal = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
  errors.value = null;
  resetModal();
}


const handleFileChange = (file) => {
  image.value = file;
  if (file instanceof File) preview.value = URL.createObjectURL(file);
}


const addProduct = async () => {
  const data = new FormData();
  data.append('product', product.value);
  data.append('category_id', category.value);
  data.append('price', price.value);
  data.append('stock', stock.value);
  data.append('description', description.value);

  if (image.value instanceof File) data.append('file', image.value);

  const result = await store.addProduct(data);

  if (result.status !== 200) errors.value = result.errors;
  if (result.status === 200) closeModal();

}


const editProduct = (data) => {
  productId.value = data.id;
  product.value = data.product;
  category.value = data.category_id;
  price.value = data.price;
  stock.value = data.stock;
  description.value = data.description;
  preview.value = data.filename ? `${path}products/${data.filename}` : null;
  image.value = null;
  showModal.value = true;
}


const updateProduct = async () => {

  const data = new FormData();
  data.append('id', productId.value);
  data.append('product', product.value);
  data.append('price', price.value);
  data.append('stock', stock.value);
  data.append('description', description.value);
  data.append('category', category.value);

  if (image.value instanceof File) data.append('file', image.value);

  const result = await store.updateProduct(data);

  if (result.status !== 200) errors.value = result.errors;
  if (result.status === 200) closeModal();

}

const deleteProduct = async (id) => {
  await store.deleteProduct(id);
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

    <template #filename="{ row }">
      <img
        class="w-15 h-15"
        :src="row.filename ? `${path}products/${row.filename}` : `${path}default.png`"
        :alt="row.product"
      >
    </template>

    <template #actions="{ row }">
      <div class="flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Edit a product."
          class="text-blue-500 hover:text-blue-800 cursor-pointer"
           @click="editProduct(row)"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" class="text-xl"/>
        </button>
        <button
          type="button"
          aria-label="Delete a product."
          class="text-red-400 hover:text-red-500 cursor-pointer"
           @click="deleteProduct(row.id)"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash" class="text-xl"/>
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
      <div
        v-if="errors?.key || errors?.server"
        class="w-full p-3 rounded text-sm text-slate-50 bg-red-400"
      >
        {{ errors?.key || errors?.server }}
      </div>

      <TextInputs
        id="product"
        type="text"
        label="Product"
        placeholder="Product"
        :hasError="errors?.product"
        :errorMsg="errors?.product"
        v-model="product"
      />

      <TextInputs
        id="category"
        type="select"
        label="Category"
        placeholder="Category"
        itemValue="id"
        itemLabel="category"
        :hasError="errors?.category"
        :errorMsg="errors?.category"
        :items="categories"
        v-model="category"
      />

      <div class="w-full flex items-center justify-between gap-4">
        <TextInputs
          id="price"
          type="text"
          label="Price"
          placeholder="Price"
          v-model="price"
        />
        <TextInputs
          id="stock"
          type="text"
          label="Stock"
          placeholder="Stock"
          v-model="stock"
        />
      </div>

      <TextInputs
        id="description"
        type="textarea"
        label="Description"
        placeholder="Description"
        v-model="description"
      />

      <div class="w-full flex justify-between gap-2">
        <img
          v-if="preview"
          class="w-15 h-15"
          :src="preview"
          :alt="product"
        >
        <TextInputs
          id="image"
          type="file"
          label="Product Image"
          accept="image/png, image/jpeg, image/webp"
          :hasError="errors?.file"
          :errorMsg="errors?.file"
          v-model="image"
          @update:modelValue="handleFileChange"
        />
      </div>
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
