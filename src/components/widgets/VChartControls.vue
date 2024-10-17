<script setup lang="ts">
import { useUserData } from '@/stores/useUserData.ts'
import { useAppSettings } from "@/stores/useAppSettings.ts";
import { useRouter } from "vue-router";

const props = defineProps<{
  id: String
}>()

const store = useUserData()
const { toggleEdit } = useAppSettings()
const router = useRouter()
const { deleteChartById } = store
function handleDelete(){
  // TODO: что тут происходит и почему???
  router.push({name: 'home'})
  deleteChartById(props.id)
}

function handleEdit(){
  toggleEdit()
}
</script>

<template>
  <div class="chart-controls">
    <VButton class="chart-controls__edit" @click="handleEdit">Edit</VButton>
    <VButton class="chart-controls__delete" @click="handleDelete">Delete</VButton>
  </div>
</template>

<style scoped lang="scss">
  //TODO: закрепить наверху!
  .chart-controls {
    &__edit {
      border-bottom-left-radius: 8px;
    }

    &__delete {
      border-top-right-radius: 8px;
    }
  }
</style>
