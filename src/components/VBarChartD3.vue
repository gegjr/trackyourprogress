<script setup lang="ts">
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { transition as d3Transition } from 'd3-transition'
import {computed, onMounted, useTemplateRef, watchEffect} from "vue";
import VBarChartItemD3 from "@/components/VBarChartItemD3.vue";
import {barMargin, chartDataType} from "@/interfaces/chart-types.ts";
import VChartGrid from "@/components/VChartGrid.vue";

// necessary fix
d3Select.prototype.transition = d3Transition;

const props = defineProps<{
  chartData: chartDataType[],
  chartWidth: number,
  chartHeight: number,
  margin: barMargin
}>()

// chart data calculations
const maxVal = computed(() => {
  return max(props.chartData.map((d) => d.value))
})

const scaleY = computed(() => {
  return scaleLinear()
      .domain([0, maxVal.value])
      .range([props.chartHeight - props.margin.bottom, props.margin.top])
})
console.log('------')
console.log(scaleY.value(0))
console.log(scaleY.value(10))
console.log('------')

const group = computed(() => {
  return props.chartData.map((d) => d.name)
})
const scaleX = computed(() => {
  return scaleBand()
      .domain(group.value)
      .range([props.margin.left, props.chartWidth - props.margin.right])
      .padding(.2)
})


// axis calc
const leftAxis = useTemplateRef<SVGGElement>("axis-left")
const bottomAxisRef = useTemplateRef<SVGGElement>("axis-bottom")
onMounted(() => {
  watchEffect(() => {
    if(!leftAxis.value) return
    d3Select(leftAxis.value)
        .transition()
        .call(axisLeft(scaleY.value).tickSize(2).tickPadding(5))
  })
  watchEffect(() => {
    if(!bottomAxisRef.value) return
    d3Select(bottomAxisRef.value)
        .transition()
        .call(axisBottom(scaleX.value).tickSize(0).tickPadding(8))
  })
})
</script>

<template>
  <div class="chart">
    Scale X: {{ scaleX('a')}}
    Scale Y: {{ scaleY(0)}}
  </div>
  <svg :width="chartWidth" :height="chartHeight">
    <VChartGrid
        :ticks="chartData.length"
        :width="chartWidth"
        :x-scale="scaleX"
        :y-scale="scaleY"
        :transition="d3Transition()"
        :transform="`translate(${margin.left}, 0)`"
    />
    <g>
      <VBarChartItemD3
          v-for="(item, i) in chartData"
          :key="i"
          :name="item.name"
          :value="item.value"
          :bar-height="chartHeight - scaleY(item.value) - margin.bottom"
          :bar-width="scaleX.bandwidth()"
          :bar-max-height="chartHeight - scaleY(maxVal)"
          :x="scaleX(item.name)"
          :y="scaleY(item.value)"
          :markers="item.markers"
      />
    </g>
    <g class="axis">
      <g ref="axis-left" :transform="`translate(${margin.left}, 0)`"></g>
      <g ref="axis-bottom" :transform="`translate(0, ${chartHeight - margin.bottom})`"></g>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>
