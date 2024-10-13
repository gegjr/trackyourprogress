<script setup lang="ts">

import VSidebarItem from "./VSidebarItem.vue";
</script>

<template>
  <div class="chart-list">
    <ul class="chart-list__list">
      <VSidebarItem class="chart-list__item" title="qwerty" />
      <VSidebarItem class="chart-list__item" title="qwerty"/>
      <VSidebarItem class="chart-list__item" title="qwerty"/>
    </ul>
    <button class="chart-list__btn">New chart</button>
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
      padding: 20px 40px;
    }
  }
</style>
