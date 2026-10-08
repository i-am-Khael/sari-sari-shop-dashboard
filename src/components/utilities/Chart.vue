<script setup>
import { Bar, Line, Pie } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale
  } from 'chart.js';


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  graph: {
    type: String,
    default: 'Line'
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({
      responsive: true,
    })
  },
  class: {
    type: String,
    default: 'p-4 h-112.5 rounded bg-slate-200 shadow-md'
  }
});

const chartComponents = {
  Bar,
  Line,
  Pie
}

</script>

<template>
  <div :class="props.class">
    <component
      :is="chartComponents[props.graph]"
      :data="props.data"
      :options="props.options"
    />
  </div>
</template>
