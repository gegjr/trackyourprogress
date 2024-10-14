<script setup lang="ts">
import VSidebarChartList from "./VSidebarChartList.vue";
import { useRouter } from 'vue-router'
import { useUserData } from "@/stores/useUserData.ts";
import { storeToRefs } from "pinia";

const router = useRouter()
const store = useUserData()
const { getChartTitles } = storeToRefs(store)

function addNewChart(){
  router.push({
    name: 'add-new'
  })
}
</script>

<template>
  <aside class="sidebar">
    <VSidebarChartList
      :data="getChartTitles"
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
