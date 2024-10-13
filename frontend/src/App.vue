<script setup lang="ts">
import ChartTest from './components/ChartTest.vue'
import {reactive, ref} from "vue";

// TODO: how does ref() WORK ??!!!?!?!?!?!?!
// ref and reactive =?????
const refData = ref([
  {x: '2016-12-25', y: 20, comment: 'test'},
  {x: '2016-12-26', y: 10}
])
const chartData = ref({
  datasets: [{
    data: refData
  }]
})


function handleClick(e){
  console.log(e)
}

function handleBtn(){
  // chartData.value.datasets[0].data.push({x: '2016-12-27', y: 20, comment: 'test1'})
  const newData = [
    {x: '2016-12-25', y: 25, comment: 'test'},
    {x: '2016-12-26', y: 11},
    {x: '2016-12-27', y: 11}
  ]

  chartData.value = {
    datasets: [{
      data: newData
    }]
  }

  refData.value = [
    {x: '2016-12-26', y: 10}
  ]
}
</script>

<template>
  <!--  TODO: IDE linting-->
  <ChartTest @click="handleClick" :datasets="chartData"/>
  <button @click="handleBtn">Test me bitch</button>
  <div>{{chartData}}</div>
</template>

<style scoped>

</style>
