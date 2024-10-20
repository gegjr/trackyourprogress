<script setup lang="ts">
import type { chartDataType } from '@/interfaces/index.ts'
import {watch, useTemplateRef, computed} from 'vue'
import { useAppSettings } from "@/stores/useAppSettings.ts";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin, annotationPlugin)

const emit = defineEmits<{
  (e: 'click', value: string): void
}>()
const props = defineProps<{
  data: chartDataType
}>()

const { settings } = useAppSettings()
const isEditing = computed(() => settings.isEditState)
const chartRef = useTemplateRef<typeof Bar>('chart')
const chartData = computed<chartDataType>(() => JSON.parse(JSON.stringify(props.data)))

watch(chartData, () => {
  if (chartRef.value){
    chartRef.value.chart.update();
  }
})

const annotation1 = {
  type: 'box',
  xMin: 2.5,
  xMax: 3.5,
  yMin: 0,
  yMax: 70,
  backgroundColor: 'rgba(250, 250, 0, 0.4)',
  borderColor: 'rgba(0, 150, 0, 0.2)',
  drawTime: 'beforeDatasetsDraw',
  borderWidth: 0,
  borderRadius: 0,
  enter: function({element}) {
    console.log(element)
    element.options.backgroundColor = 'red'
    return true;
  },
  click: function({element}) {
    console.log(element.label.options.content + ' clicked');
  },
  leave: function({element}) {
    element.options.backgroundColor = 'transparent'
    return true;
  },
};

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
    },
    annotation: {
      annotations: {
        annotation1
      }
    }
  },
  responsive: true,
  onClick: (e: Event) => {
    handleChartClick(e)
  },
}

function handleChartClick(e: Event) {
  if (chartRef.value) {
    const chart = chartRef.value.chart
    const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    if (points.length) {
      const firstPoint = points[0];
      const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

      emit('click', value.comment)
    }
  }
}
</script>

<template>
  <div>
    <div class="chart-wrapper" :class="{'is-editing': isEditing}">
      <Bar
          id="my-chart-id"
          :options="chartOptions as any"
          :data="chartData as any"
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
