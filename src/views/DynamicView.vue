<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed, reactive, ref} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";
import VButton from "@/components/VButton.vue";

const route = useRoute()
const store = useUserData()
const { getChartByUrl, getEditableChartData, addChartData, deleteChartData } = store

const url = computed(() => {
  console.log('url')
  return route.params.url
})
// TODO: why computed need .value?
// const chartObj = computed(() => getChartByUrl(url.value))
const chartObj = ref(computed(() => {
    console.log('chartObj')
    return getChartByUrl(url.value)
}))

const typeToComponent = {
  'bar': VBarChart,
  'point': VPointChart,
  'radar': VScatterChart
}
const currentComponent = computed(() => typeToComponent[chartObj.value.type])

const chartData = computed(() =>  chartObj.value.data)
const chartTitle = computed(() => chartObj.value.title)
const id = computed(() => chartObj.value?.id)


const editableObj = ref(computed(() => getEditableChartData(id.value)))

function handleAddData(){
  addChartData({data:'', label:''}, id.value)
}

function handleDeleteData(index){
  deleteChartData(id.value, index)
  // console.log(index)
}
</script>

<template>
  <h1>{{ chartTitle }}</h1>
  <h2>{{ chartObj }}</h2>
  <h2>{{ id }}</h2>
  <component
      :key="id"
      :is="currentComponent"
      :data="chartData"
      :id="id"
  ></component>
  <div class="edit">
    <div class="edit__data">
      <h2 class="edit__data-title">Edit data</h2>
      <div class="edit__data-content">
        <div class="grid-table">
          <div class="grid-table__row" v-for="i in editableObj.labels.length">
            <div class="grid-table__column">{{ i }}.</div>
            <div class="grid-table__column">
              <input type="text" v-model="editableObj.labels[i - 1]">
            </div>
            <div class="grid-table__column">
              <input type="text" v-model="editableObj.data[i - 1]">
            </div>
            <div class="grid-table__column grid-table__actions">
              <VButton class="grid-table__btn" @click="handleDeleteData(i - 1)">Del</VButton>
            </div>
          </div>
        </div>
        <VButton @click="handleAddData">Add data</VButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    margin-bottom: 20px;
  }

  .edit {
    margin-top: 30px;
    border: 1px dotted grey;
    padding: 20px;

    &__data {
      width: 525px;
    }
  }

  .grid-table {
    &__row {
      display: grid;
      grid-template-columns: 35px 1fr 1fr 75px;
      overflow: hidden;
      border-top: 1px solid grey;

      &:last-child {
        border-bottom: 1px solid grey;
      }
    }

    &__column {
      border-right: 1px solid grey;
      padding: 5px;

      &:first-child {
        border-left: 1px solid grey;
      }
    }

    &__btn {
      padding: 5px 10px;
    }
  }
</style>
