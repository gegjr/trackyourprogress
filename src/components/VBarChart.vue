<script setup lang="ts">
import VChartControls from "@/components/VChartControls.vue";

import {watch, useTemplateRef, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const emit = defineEmits(['click']) // todo: typing
const props = defineProps(['data', 'id']) // todo: validation

const chartRef = useTemplateRef('chart')
const chartData = props.data
watch(chartData, () => {
  chartRef.value.chart.update();
})

const chartOptions = {
  responsive: true,
  onClick: (e) => {
    handleChartClick(e)
  },
}

function handleChartClick(e) {
  const chart = chartRef.value.chart
  const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
  if (points.length) {
    const firstPoint = points[0];
    const label = chart.data.labels[firstPoint.index];
    const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

    emit('click', value.comment)
  }
}
</script>

<template>
  <div class="chart-wrapper">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        ref="chart"
        class="bar-chart"
    />
    <VChartControls
        class="chart-controls"
        :id="id"
    />
  </div>
</template>

<style scoped>
.chart-controls {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
