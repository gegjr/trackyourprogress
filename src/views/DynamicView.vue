<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed, reactive, ref} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";
import VChartEdit from "@/components/VChartEditData.vue";
import VChartControls from "@/components/VChartControls.vue";

const route = useRoute()
const store = useUserData()
const { getChartByUrl, getEditableChartData, addChartData, deleteChartData, addNewBar } = store

const url = computed(() => route.params.url)
// TODO: why computed need .value?
const chartObj = computed(() => getChartByUrl(url.value))

const typeToComponent = {
  'bar': VBarChart,
  'point': VPointChart,
  'radar': VScatterChart
}
const currentComponent = computed(() => typeToComponent[chartObj.value.type])

const chartData = computed(() =>  chartObj.value.data)
const chartTitle = computed(() => chartObj.value?.title)
const id = computed(() => chartObj.value?.id)


const editableObj = ref(computed(() => getEditableChartData(id.value)))

function handleAddData(){
  addChartData({data:'', label:''}, id.value)
}

function handleDeleteData(index){
  deleteChartData(id.value, index)
}

function handleAddNewBar(index){
  addNewBar(id.value, index)
}
</script>

<template>
  <h1>{{ chartTitle }}</h1>
  <component
      :key="id"
      :is="currentComponent"
      :data="chartData"
      :id="id"
  ></component>
  <VChartEdit
      v-if="false"
    :chart-id="id"
    @add-data="handleAddData"
    @add-new-bar="handleAddNewBar"
    @delete-data="handleDeleteData"
  />
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
