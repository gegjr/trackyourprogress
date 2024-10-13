<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import {ref, useTemplateRef, computed } from 'vue'
const emit = defineEmits(['click']) // todo: typing
const props = defineProps(['datasets', 'testData']) // todo: validation

const chartRef = useTemplateRef('chart')
// const chartData = props.datasets
const chartData = computed(() => {return props.datasets})

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
    <h1>here</h1>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        ref="chart"
        class="bar-chart"
    />
  </div>
</template>

<style scoped>

</style>
