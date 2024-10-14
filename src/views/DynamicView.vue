<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";

const route = useRoute()
const store = useUserData()
const { getChartByUrl } = store

const url = computed(() => { return route.params.url })
// TODO: why computed need .value?
// const urlDataObj = computed(() => { return userData.charts[url.value]})
const urlDataObj = computed(() => getChartByUrl(url.value))
console.log('urlDataObj', urlDataObj)
console.log('urlDataObj.value.type', urlDataObj.type)
const urlDataComponent = {
  'bar': VBarChart,
  'point': VPointChart,
  'radar': VScatterChart
}
const currentComponent = computed(() => { return urlDataComponent[urlDataObj.value.type]})
const chartData = computed(() => urlDataObj.value.data)
</script>

<template>
  <h6>{{ urlDataObj }}</h6>
  <p>-----------</p>
  <h6>{{ currentComponent }}</h6>
  <p>-----------</p>
  <h6>chartData: {{ chartData }}</h6>
  <component
      :is="currentComponent"
      :data="chartData"
  ></component>
</template>

<style scoped>

</style>
