<script setup lang="ts">
import VChartControls from "@/components/VChartControls.vue";

import {watch, useTemplateRef, computed, shallowRef} from 'vue'
import { useAppSettings } from "@/stores/useAppSettings.ts";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin)

const emit = defineEmits(['click']) // todo: typing
const props = defineProps(['data', 'id']) // todo: validation

const { settings } = useAppSettings()
const isEditing = computed(() => settings.isEditState)
const chartRef = useTemplateRef('chart')
// const chartData = computed(() => props.data)
const chartData = computed(() => JSON.parse(JSON.stringify(props.data)))

watch(chartData, () => {
  chartRef.value.chart.update();
})


const chartOptions = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'rgb(255, 99, 132)'
      },
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true
        },
        mode: 'x',
      }
    }
  },
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
  <div>
    <div class="chart-wrapper" :class="{'is-editing': isEditing}">
      <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
          ref="chart"
          class="bar-chart"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
//TODO: постоянный отступ снизу
.chart-wrapper {
  transition: filter .3s ease-out;
  position: relative;
  height: 36vw;
  max-height: 490px;

  //&.is-editing {
  //  filter: blur(4px)
  //}
}

.bar-chart {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
