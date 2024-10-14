<script setup lang="ts">
import ChartTest from './components/VBarChart.vue'
import VSidebar from "./components/VSidebar.vue";

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
  <div class="container">
    <VSidebar/>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    height: 100%;
    max-width: 1280px;
    min-width: 1280px;
    max-height: 800px;
    margin: 0 auto;
    align-self: center;
    border: 1px solid grey;
    border-radius: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px;
  }
</style>
