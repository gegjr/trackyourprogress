<script setup lang="ts">
defineProps({
  title: String,
})

</script>

<template>
  <li class="chart-list-item">
    <RouterLink to="/about">
      <i class="chart-list-item__icon">I</i>
      <h3 class="chart-list-item__title">{{ title }}</h3>
    </RouterLink>
  </li>
</template>

<style scoped>
  .chart-list-item {
    display: flex;
    gap: 8px;
  }
</style>
