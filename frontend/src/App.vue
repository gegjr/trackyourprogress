<script setup lang="ts">
import ChartTest from './components/ChartTest.vue'
import {ref} from "vue";

// TODO: how does ref() WORK ??!!!?!?!?!?!?!
const chartData = ref({
  datasets: [{
    data: [
      {x: '2016-12-25', y: 20, comment: 'test'},
      {x: '2016-12-26', y: 10}
    ]
  }]
})


function handleClick(e){
  console.log(e)
}

function handleBtn(){
  const tempArr = {...chartData.value}
  tempArr.datasets[0].data.push({x: '2016-12-25', y: 20, comment: 'test'})
  chartData.value = tempArr
}
</script>

<template>
  <!--  TODO: IDE linting-->
  <ChartTest @click="handleClick" :datasets="chartData"/>
  <button @click="handleBtn">Test me bitch</button>
</template>

<style scoped>

</style>
