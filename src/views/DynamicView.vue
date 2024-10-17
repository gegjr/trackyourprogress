<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";
import VChartControls from "@/components/VChartControls.vue";

const route = useRoute()
const store = useUserData()
const { getChartByUrl } = store

const url = computed(() => route.params.url).value as string
// TODO: why computed need .value?
const chartObj = computed(() => getChartByUrl(url)).value!

const typeToComponent = {
  'bar': VBarChart,
  'point': VPointChart,
  'radar': VScatterChart
}
const currentComponent = computed(() => typeToComponent[chartObj.type as keyof typeof typeToComponent])
const chartData = computed(() =>  chartObj.data)
const chartTitle = computed(() => chartObj.title)
const id = computed(() => chartObj.id)
</script>

<template>
  <h1>{{ chartTitle }}</h1>
  <component
      :key="id"
      :is="currentComponent"
      :data="chartData"
      :id="id"
  ></component>
  <VChartControls
      class="chart-controls"
      :id="id"
  />
</template>

<style scoped lang="scss">
  h1 {
    margin-bottom: 20px;
  }

  .chart-controls {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
