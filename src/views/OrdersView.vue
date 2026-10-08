<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/orders';
import { useDataTable } from '@/composables/useDataTable';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DataTable from '@/components/utilities/DataTable.vue';
import TableHeader from '@/components/utilities/TableHeader.vue';
import Pagination from '@/components/utilities/Pagination.vue';
import OrderItems from '@/components/orders/OrderItems.vue';

const store = useOrderStore();
const { orders, columns, orderItemColumns } = storeToRefs(store);
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
} = useDataTable(orders, {
  searchFields: ['order_id', 'status'],
  itemsPerPage: 10
});

const viewOrders = ref(false);
const orderItems = ref({});

const viewOrderItems = (data) => {
  orderItems.value = {
    reference_id: data.reference_id,
    items: data.items
  }
  viewOrders.value = true;
}


onMounted(async () => {
  await store.getAllOrders();
});

</script>

<template>
	<section class="w-full">
  	<DataTable
      :columns="columns"
      :rows="paginatedItems"
      :sortKey="sortKey"
      :sortDirection="sortDirection"
      @sort="handleSort"
    >
		  <template #header>
        <TableHeader
          headerText="Sari-Sari-Shop Dashboard"
          mainText="Orders"
          subText="Manage your orders."
          placeholder="Search orders..."
          :hideButton="false"
          @search="handleSearch"
        />
			</template>


      <template #actions="{ row }">
        <div class="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Edit a product."
            class="text-blue-500 hover:text-blue-800 cursor-pointer"
            @click="viewOrderItems(row)"
          >
            <FontAwesomeIcon icon="fa-solid fa-eye" class="text-xl"/>
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

  	<OrderItems
      v-if="viewOrders"
      :orders="orderItems"
      :columns="orderItemColumns"
      @close="viewOrders = false"
    />

	</section>
</template>
