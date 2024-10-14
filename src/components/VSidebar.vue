<script setup lang="ts">
import VSidebarChartList from "./VSidebarChartList.vue";
import {useUserData} from "@/stores/useUserData.ts";
const store = useUserData()

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

function addNewChart(){
  console.log(store.getChartTitles)
}
</script>

<template>
  <aside class="sidebar">
    <VSidebarChartList
      :data="chartListData"
    />
    <VButton class="sidebar__btn" @click="addNewChart">Add new chart</VButton>
  </aside>
</template>

<style scoped lang="scss">
  .sidebar {
    border-right: 1px solid grey;
    width: 230px;
    flex-shrink: 0;

    &__btn {
      width: 100%;
    }
  }
</style>
