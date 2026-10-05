 <script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { utilities } from '@/composables/utilities';
import DashboardCard from '@/components/utilities/DashboardCard.vue';
import Chart from '@/components/utilities/Chart.vue';

const { formatMoney } = utilities();

const store = useDashboardStore();
const { totals, sales, popularCategories } = storeToRefs(store);

const period = ref('day');
const selectedDate = ref(new Date().toISOString().slice(0, 10));


// const salesData = computed(() => ({
//   labels: sales.value.labels,
//   datasets: [
//     {
//       label: 'Sales',
//       data: sales.value.sales,
//       backgroundColor: red,
//       borderColor: 'gray'
//     },
//   ]
// }));


// const salesOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: true,
//       text: 'Popular Categories ( Item Sold ) '
//     }
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         precision: 0
//       }
//     }
//   }
// }


const popCategoriesData = computed(() => ({
  labels: popularCategories.value.map(item => item.category),
  datasets: [
    {
      data: popularCategories.value.map(item => Number(item.total_items_sold)),
      backgroundColor: popularCategories.value.map(item => item.color),
      borderColor: 'gray'
    },
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
  store.getSales({
    'period': period.value,
    'date': selectedDate.value
  });
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

    <div class="w-full flex flex-col gap-4 mt-6">

      <div class="p-6 rounded bg-slate-400">
        <div class="flex flex-row-reverse items-center gap-4">
          <div class="inline-flex items-center justify-center gap-2">
            <label for="period" class="font-medium text-slate-700">Sales Per:</label>
            <select
              id="period"
              name="period"
              class="px-2 py-1 rounded border border-slate-300 cursor-pointer"
              v-model="period"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="Year">Year</option>
            </select>
          </div>
          <div class="inline-flex items-center justify-center gap-2">
            <label for="selectedDate" class="font-medium text-slate-700">Date</label>
            <input
              id="selectedDate"
              type="date"
              class="px-2 py-1 rounded border border-slate-300 cursor-pointer"
              v-model="selectedDate"
            >
          </div>
        </div>
        <Chart
          graph="Line"
          :data="popCategoriesData"
          :options="popCategoriesOptions"
          class="h-112.5"
        />
      </div>

      <Chart
        graph="Bar"
        :data="popCategoriesData"
        :options="popCategoriesOptions"
      />

    </div>

  </section>
</template>
