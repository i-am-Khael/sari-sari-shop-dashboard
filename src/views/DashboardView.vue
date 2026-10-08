 <script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';
import { utilities } from '@/composables/utilities';
import DashboardCard from '@/components/dashboard/DashboardCard.vue';
import Chart from '@/components/utilities/Chart.vue';

const store = useDashboardStore();
const { formatMoney } = utilities();
const { totals, sales, popularCategories } = storeToRefs(store);

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const period = ref('Day');
const selectedDate = ref(today());


const salesData = computed(() => ({
  labels: sales.value.labels,
  datasets: [
    {
      label: 'Sales',
      data: sales.value.sales ?? [],
      backgroundColor: 'blue',
      borderColor: '#fff'
    },
  ]
}));


const salesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { ticks: { color: '#fff' } },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#fff',
        precision: 0
      }
    }
  }
}


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
  cutout: 0,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        color: '#334155'
      }
    },
    tooltip: {
      backgroundColor: '#0f172a',
      titleColor: '#ffffff',
      bodyColor: '#e2e8f0',
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label(context) {
          const values = context.dataset.data;
          const total = values.reduce((sum, value) => sum + value, 0);
          const value = context.raw;
          const percent = total ? ((value / total) * 100).toFixed(1) : 0;
          return ` ${context.label}: ${value} (${percent}%)`;
        }
      }
    }
  },
  layout: {
    padding: 12
  }
}




const handleSalesPerPeriod = async () => {
  await store.getSales({
    period: period.value,
    date: selectedDate.value
  });
}

watch([period, selectedDate], handleSalesPerPeriod);

onMounted(async () => {
  await store.getTotals();
  await store.getSales({
    'period': period.value,
    'date': selectedDate.value
  });
  await store.getPopularCategories();
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

      <div class="p-6 rounded bg-linear-to-b from-green-900 to-green-700">
        <div class="mb-4 flex items-center justify-between">
          <p class="font-semibold tracking-wider text-2xl text-slate-50">Sales per {{ period }}</p>
          <div class="inline-flex items-center justify-center gap-4">
            <div class="inline-flex items-center justify-center gap-2">
              <label for="selected-date" class="font-medium text-slate-100">Date:</label>
              <input
                id="selected-date"
                type="date"
                class="px-2 py-1 text-slate-100 rounded border border-slate-300 cursor-pointer"
                v-model="selectedDate"
              >
            </div>
            <div class="inline-flex items-center justify-center gap-2">
              <label for="period" class="font-medium text-slate-100">Sales Per:</label>
              <select
                id="period"
                name="period"
                class="px-2 py-1 text-slate-100 rounded border border-slate-300 cursor-pointer"
                v-model="period"
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
          </div>
        </div>
        <Chart
          graph="Line"
          :data="salesData"
          :options="salesOptions"
          class="h-112.5"
        />
      </div>

      <Chart
        graph="Pie"
        :data="popCategoriesData"
        :options="popCategoriesOptions"
      />

    </div>

  </section>
</template>
