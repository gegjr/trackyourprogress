<script setup lang="ts">
import VSidebarItem from "./VSidebarItem.vue";
import VSidebarChartList from "./VSidebarChartList.vue";

</script>

<template>
  <aside class="sidebar">
    <VSidebarChartList />
  </aside>
</template>

<style scoped>
  .sidebar {
    width: 280px;
    border-right: 1px solid grey;
  }
</style>
