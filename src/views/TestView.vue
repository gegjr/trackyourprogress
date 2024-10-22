<script setup lang="ts">
import VBarChartD3 from "@/components/VBarChartD3.vue";
import {barMargin, chartDataType} from "@/interfaces/chart-types.ts";
import {computed, ref} from "vue";

const data = ref<chartDataType[]>([
  {name:'a', value: 10},
  {name:'b', value: 5, markers: [{fill: 'red'}, {fill: 'blue'}]},
  {name:'c', value: 1},
  {name:'d', value: 7, markers: [{fill: 'grey'}]},
  {name:'e', value: 6, markers: [{fill: 'red'}, {fill: 'blue'}, {fill: 'green'}]},
  {name:'f', value: 5},
])

const margin = ref<barMargin>({
  top: 10,
  right: 10,
  bottom: 30,
  left: 30,
})


function handleChange(){
  data.value = [
    {name:'a', value: 10},
    {name:'b', value: 9},
    {name:'c', value: 8},
    {name:'d', value: 7},
    {name:'e', value: 6},
    {name:'f', value: 5},
  ]
}
function handleChange2(){
  data.value = [
    {name:'a', value: 4},
    {name:'b', value: 6},
    {name:'c', value: 1},
  ]
}

function handleChange3(){
  data.value.push({name:'new', value: 4})
}
</script>

<template>
  <h1>testing area</h1>
  <button @click="handleChange">Change data!</button>
  <button @click="handleChange2">Change data!2</button>
  <button @click="handleChange3">Push data!</button>
  <VBarChartD3
      :chart-data="data"
      :chart-width="600"
      :chart-height="400"
      :margin="margin"
  />
</template>

<style scoped lang="scss">

</style>
