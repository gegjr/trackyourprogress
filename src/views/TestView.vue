<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {computed} from "vue";
import {useTestStore} from "@/stores/useTestStore.ts";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useTestStore()
const { userData, deleteDataFromChart } = store

const chartData = computed(() => JSON.parse(JSON.stringify(userData.charts[0].data)))


const chartOptions = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'rgb(255, 99, 132)'
      },
    }
  },
  responsive: true,
}
function handleTest(){
  deleteDataFromChart(0)
}
</script>

<template>
  <h1>testing area</h1>
  <VButton @click="handleTest">Test</VButton>
  <Bar
      :options="chartOptions"
      :data="chartData"
      ref="chart"
      class="bar-chart"
  />
</template>

<style scoped lang="scss">

</style>
