<script setup lang="ts">
import { Marker } from "@/interfaces/chart-types.ts";
import {computed} from "vue";

const props = defineProps<{
  name: string,
  value: number,
  barHeight: number,
  barWidth: number,
  barMaxHeight: number,
  x: number,
  y: number,
  markers: Marker[]
}>()

const translateMarker = computed(() => {
  if (!props.markers) return 0
  return -7.5 * (props.markers.length - 1)
})
</script>

<template>
  <g class="rect-container">
    <rect
        class="rect"
        :x="x"
        :y="y"
        :width="barWidth"
        :height="barHeight"
        opacity="1"
        fill="#9d174d"
        rx="1"
    />
    <rect
        class="rect-bg"
        :x="x"
        :y="0"
        :width="barWidth"
        :height="barMaxHeight"
        opacity="0.2"
        fill="green"
        rx="1"
    />
  <g class="markers" :transform="`translate(${translateMarker}, 0)`">
      <circle
          class="markers__item"
          v-for="(item, i) in markers" :key="i"
          :cx="(x + barWidth / 2 + 15 * i) "
          :cy="y"
          r="5"
          :style="`fill:${item.fill};  stroke-width:2px; stroke:teal;`"
      />
    </g>
  </g>
</template>

<style scoped lang="scss">
.rect {
  transition: all .3s;
}

.markers__item {
  transition: all .3s;
}

.rect-container {
  &:hover {
    .rect {
      opacity: 1;
    }
  }
}
</style>
