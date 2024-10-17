<script setup lang="ts">
defineProps<{
  title: string,
  to: string,
  type: string
}>()

</script>

<template>
  <li class="chart-list-item">
    <RouterLink :to="to" class="chart-list-item__link">
      <i class="chart-list-item__icon">({{ type }})</i>
      <h3 class="chart-list-item__title">{{ title }}</h3>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
  .chart-list-item {
    &:first-child {
      .chart-list-item__link {
        border-top-left-radius: 8px;
      }
    }

    &__link {
      display: flex;
      gap: 8px;
      padding: 10px 20px;
      border-bottom: 1px solid grey;
      transition: .2s ease-out;

      &:hover {
        background-color: lightpink;
      }
    }
  }
</style>
