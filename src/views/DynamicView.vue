<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserData } from '@/stores/useUserData'
import {computed} from "vue";

// Components
import VBarChart from "@/components/VBarChart.vue";
import VPointChart from "@/components/VPointChart.vue";
import VScatterChart from "@/components/VScatterChart.vue";

const route = useRoute()
const store = useUserData()
const userData = store.userData

const url = computed(() => { return route.params.url })
// TODO: why computed need .value?
const urlDataObj = computed(() => { return userData.charts[url.value]})
const urlDataComponent = {
  'bar-chart': VBarChart,
  'points-chart': VPointChart,
  'radar-chart': VScatterChart
}
const currentComponent = computed(() => { return urlDataComponent[urlDataObj.value.type]})
</script>

<template>
  <h6>{{ urlDataObj }}</h6>
  <h6>{{ urlDataObj.data }}</h6>
  <component
      :is="currentComponent"
      :data="urlDataObj.data"
  ></component>
</template>

<style scoped>

</style>
