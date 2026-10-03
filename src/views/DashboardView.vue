 <script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar, Line } from 'vue-chartjs';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const store = useCategoriesStore();
const { categories } = storeToRefs(store);

const chartData = computed(() => ({
  labels: categories.value.map(item => item.category),
  datasets: [
    {
      label: 'Categories',
      data: categories.value.map(() => 1)
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAscpectRatio: false,
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'Product Categories'
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
</script>

<template>
  <section>
      <Line
        id="my-chart-js"
        :data="chartData"
        :options="chartOptions"
      />
  </section>
</template>
