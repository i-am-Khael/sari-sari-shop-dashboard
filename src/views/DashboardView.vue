 <script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { utilities } from '@/composables/utilities';
import DashboardCard from '@/components/utilities/DashboardCard.vue';
import Chart from '@/components/utilities/Chart.vue';

const { formatMoney } = utilities();

const store = useDashboardStore();
const { totals, popularCategories } = storeToRefs(store);

const popCategoriesData = computed(() => ({
  labels: popularCategories.value.map(item => item.category),
  datasets: [
    {
      data: popularCategories.value.map(item => Number(item.total_items_sold)),
      backgroundColor: popularCategories.value.map(item => item.color),
      borderColor: popularCategories.value.map(item => item.color)
    }
  ]
}));


const popCategoriesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Popular Categories ( Item Sold ) '
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
}


onMounted(() => {
  store.getTotals();
  store.getPopularCategories();
});

</script>

<template>
  <section>
    <div class="grid grid-cols-4 gap-4" >
      <DashboardCard
        icon="fa-solid fa-sack-dollar"
        iconClass="text-5xl text-green-400"
        customClass="bg-linear-to-b from-green-900 to-green-700"
        :mainText="`$${formatMoney(totals.total_sales)}`"
        subText="Total Sales"
      />
      <DashboardCard
        icon="fa-solid fa-hand-holding-dollar"
        iconClass="text-5xl text-pink-300"
        customClass="bg-linear-to-b from-pink-900 to-pink-700"
        :mainText="totals.total_orders"
        subText="Total Paid Orders"
      />
      <DashboardCard
        iconClass="text-5xl text-purple-300"
        customClass="bg-linear-to-b from-purple-900 to-purple-700"
        :mainText="totals.total_products"
        subText="Total Products"
      />
      <DashboardCard
        icon="fa-solid fa-table-list"
        :mainText="totals.total_categories"
        subText="Total Categories"
      />
    </div>

    <div class="w-full mt-6 grid grid-cols-2 gap-4">
      <Chart
        graph="Bar"
        :data="popCategoriesData"
        :options="popCategoriesOptions"
      />
      <Chart
        graph="Bar"
        :data="popCategoriesData"
        :options="popCategoriesOptions"
      />
    </div>

  </section>
</template>
