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

const cChartWidth = computed(() => props.chartWidth - props.margin.left - props.margin.right)
const cChartHeight = computed(() => props.chartHeight - props.margin.top - props.margin.bottom)

// chart data calculations
const maxVal = computed(() => {
  return max(props.chartData.map((d) => d.value))
})

const scaleY = computed(() => {
  return scaleLinear()
      .domain([0, maxVal.value])
      .range([cChartHeight.value, 0])
})

const group = computed(() => {
  return props.chartData.map((d) => d.name)
})
const scaleX = computed(() => {
  return scaleBand()
      .domain(group.value)
      .range([0, cChartWidth.value])
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
<!--  <div class="chart">-->
<!--    Scale X: {{ scaleX('a')}}-->
<!--    Scale Y: {{ scaleY(0)}}-->
<!--  </div>-->

  <svg :width="cChartWidth + margin.left + margin.right" :height="cChartHeight + margin.top + margin.bottom">
    <VChartGrid
        :ticks="chartData.length"
        :width="cChartWidth"
        :x-scale="scaleX"
        :y-scale="scaleY"
        :transition="d3Transition()"
        :transform="`translate(${margin.left}, ${margin.top})`"
    />
    <g :transform="`translate(${margin.left}, ${margin.top})`">
      <VBarChartItemD3
          v-for="(item, i) in chartData"
          :key="i"
          :name="item.name"
          :value="item.value"
          :bar-height="cChartHeight - scaleY(item.value)"
          :bar-width="scaleX.bandwidth()"
          :bar-max-height="cChartHeight - scaleY(maxVal)"
          :x="scaleX(item.name)"
          :y="scaleY(item.value)"
          :markers="item.markers"
      />
    </g>
    <g class="axis" :transform="`translate(${margin.left}, ${margin.top})`">
      <g ref="axis-left"></g>
      <g ref="axis-bottom" :transform="`translate(0, ${cChartHeight})`"></g>
    </g>
  </svg>
</template>

<style scoped lang="scss">

</style>
