<script setup lang="ts">
import {axisBottom, axisLeft} from 'd3-axis';
import {select as d3Select, select} from 'd3-selection';
import {onMounted, useTemplateRef, watchEffect} from "vue";

const props = defineProps<{
  width: number,
  transition: Object,
  xScale: Function,
  yScale: Function,
  ticks: number
}>()

const gridlines = ({ yScale, width, ticks }) => axisLeft(yScale)
    .ticks(ticks)
    .tickSize(-width)
    .tickFormat('')

const gridRef = useTemplateRef<SVGGElement>('grid-group-ref')

onMounted(() => {
  watchEffect(() => {
    select(gridRef.value)
        .transition(props.transition)
        .call(gridlines({
          yScale: props.yScale,
          width: props.width,
          ticks: props.ticks
        }));
  })

  // select(gridRef.value)
  //     .call(gridlines({
  //       yScale: props.yScale,
  //       width: props.width,
  //       ticks: props.ticks
  //     }));
})
</script>

<template>
  <g
      ref="grid-group-ref"
      class="grid-group"
  />
</template>

<style scoped lang="scss">
 .grid-group {
   :deep(.domain){
     display: none;
   }

   :deep(.tick) {
     opacity: 1;

     line {
       stroke: grey;
       stroke-dasharray: 2px, 3px;
     }
   }
 }
</style>
