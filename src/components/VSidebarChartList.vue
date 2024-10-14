<script setup lang="ts">
import VSidebarItem from "./VSidebarItem.vue";
defineProps({
  data: Array
})

function titleToUrl(title){
  return title.split(" ").join('-').toLowerCase()
}
</script>

<template>
  <div class="chart-list">
    <ul class="chart-list__list">
      <VSidebarItem
          class="chart-list__item"
          v-for="(item, i) in data"
          :title="item.title"
          :to="titleToUrl(item.title)"
          :key="item.title + i"
      />
    </ul>
  </div>

</template>

<style scoped lang="scss">
  //TODO: reset css
  .chart-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__list {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
</style>
