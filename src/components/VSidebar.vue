<script setup lang="ts">
import VSidebarChartList from "./VSidebarChartList.vue";

const chartListData = [
  {
    title: 'Bar chart'
  },
  {
    title: 'Points chart'
  },
  {
    title: 'Radar chart'
  },
]
</script>

<template>
  <aside class="sidebar">
    <VSidebarChartList
      :data="chartListData"
    />
  </aside>
</template>

<style scoped>
  .sidebar {
    border-right: 1px solid grey;
    width: 230px;
    flex-shrink: 0;
  }
</style>
