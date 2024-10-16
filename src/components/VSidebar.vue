<script setup lang="ts">
import VSidebarChartList from "./VSidebarChartList.vue";
import { useRouter } from 'vue-router'
import { useUserData } from "@/stores/useUserData.ts";
import { useAppSettings } from "@/stores/useAppSettings.ts";
import { storeToRefs } from "pinia";
import {computed} from "vue";
import VChartEditData from "@/components/VChartEditData.vue";
import VChartEditStructure from "@/components/VChartEditStructure.vue";

const router = useRouter()
const store = useUserData()
const { settings } = useAppSettings()
const { getChartTitles } = storeToRefs(store) // TODO: а нахуя тогда экшены?
const sidebarStateClass = computed(() => {
  return settings.sidebarState
})
const showCharts = computed(() => settings.sidebarState === 'normal')
const showEdit = computed(() => settings.sidebarState === 'big')

function addNewChart(){
  router.push({
    name: 'add-new'
  })
}
</script>

<template>
  <aside class="sidebar" :class="sidebarStateClass">
    <Transition>
      <div v-if="showCharts">
        <VSidebarChartList
          :data="getChartTitles"
        />
        <VButton class="sidebar__btn" @click="addNewChart">Add new chart</VButton>
      </div>
    </Transition>
    <Transition>
      <div class="edit-data-wrapper" v-if="showEdit">
        <VChartEditData class="edit-data__data"/>
        <VChartEditStructure  class="edit-data__structure"/>
      </div>
    </Transition>
  </aside>
</template>

<style scoped lang="scss">
  .sidebar {
    border-right: 1px solid grey;
    width: 230px;
    flex-shrink: 0;
    transition: width .3s ease;
    position: relative;

    &.big {
      width: 400px;
    }

    &__btn {
      width: 100%;
    }
  }

  .edit-data {
    &__data{
      padding: 20px;
      border-bottom: 1px solid gray;
    }

    &__structure {
      padding: 20px;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity .3s;
    position: absolute;
    width: 100%;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
</style>
