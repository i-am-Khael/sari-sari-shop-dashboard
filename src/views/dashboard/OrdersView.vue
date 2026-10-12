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
import Button from '@/components/utilities/Button.vue';

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

const shipOrderModal = ref(false)
const shipOrder = ref(null);
const viewOrders = ref(false);
const orderItems = ref({});

const viewOrderItems = (data) => {
  orderItems.value = {
    reference_id: data.reference_id,
    items: data.items
  }
  viewOrders.value = true;
}


const showShipOrderModal = (data) => {
  shipOrderModal.value = true;
  shipOrder.value = data;
}

const handleShipOrder = async () => {

  const params = {
    'id': shipOrder.value.id,
    'order_id': shipOrder.value.order_id,
    'reference_id': shipOrder.value.reference_id
  }

  const result = await store.shipOrder(params);

  if (result.status === 200) shipOrderModal.value = false;

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
          <button
            type="button"
            aria-label="Edit a product."
            class="text-green-500 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            :disabled="row.status !== 'PAID'"
            @click="showShipOrderModal(row)"
          >
            <FontAwesomeIcon icon="fa-solid fa-truck-fast" class="text-xl"/>
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

    <div
      v-if="shipOrderModal"
      class="w-full h-full absolute overflow-x-auto top-0 left-0 z-50 flex items-center justify-center backdrop-blur-xs bg-slate-950/40"
    >
      <div class="p-6 text-slate-950 rounded shadow-md bg-slate-200" >
        <p>Are you sure you want to ship this order?</p>
        <div class="w-full mt-4 inline-flex items-center justify-center gap-4" >
          <Button
            type="add"
            label="Yes"
            customClass="w-full p-2 text-slate-200 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer"
            @click="handleShipOrder"
          />
          <Button
            type="cancel"
            label="Cancel"
            customClass="w-full p-2 text-slate-200 rounded bg-red-500 hover:bg-red-600 cursor-pointer"
            @click="shipOrderModal = false"
          />
        </div>
      </div>
    </div>

	</section>
</template>
