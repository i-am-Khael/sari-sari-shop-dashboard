<script setup>
import { Bar, Line } from 'vue-chartjs';

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

const props = defineProps({
  graph: {
    type: String,
    default: 'Line',
    validator: value => ['Line', 'Bar'].includes(value)
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
});

const chartComponents = {
  Line,
  Bar
}

</script>

<template>
  <div class="p-4 h-80 rounded bg-slate-200">
    <component
      :is="chartComponents[props.graph]"
      :data="props.data"
      :options="props.options"
    />
  </div>
</template>
