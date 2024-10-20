<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";
import VChartControls from "@/components/widgets/VChartControls.vue";
import VAddSingleRecord from "@/components/widgets/VAddSingleRecord.vue";

const route = useRoute()
const store = useUserData()
const { getChartByUrl } = store

// const url = computed(() => route.params.url).value as string
const url = computed(() => route.params.url)
// TODO: why computed need .value?
const chartObj = computed(() => getChartByUrl(url.value))

const typeToComponent = {
  'bar': VBarChart,
  'point': VPointChart,
  'radar': VScatterChart
}
const currentComponent = computed(() => typeToComponent[chartObj.value.type as keyof typeof typeToComponent])
const chartData = computed(() =>  chartObj.value.data)
const chartTitle = computed(() => chartObj.value.title)
const id = computed(() => chartObj.value.id)
</script>

<template>
  <VChartControls
      class="chart-controls"
      :id="id"
  />
  <div class="chart-content">
    <h1>{{ chartTitle }}</h1>
    <component
        :key="id"
        :is="currentComponent"
        :data="chartData"
        :id="id"
    ></component>
    <VAddSingleRecord />
  </div>
</template>

<style scoped lang="scss">
  .chart-content {
    padding: 40px;
  }

  h1 {
    margin-bottom: 20px;
  }

  .chart-controls {
    position: sticky;
    display: inline-flex;
    margin-left: auto;
    top: 0;
  }
</style>
