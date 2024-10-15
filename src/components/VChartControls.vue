<script setup lang="ts">
import { useUserData } from '@/stores/useUserData'
import { useRouter } from "vue-router";

const emit = defineEmits(['deleteChart'])
const props = defineProps({
  id: String
})

const store = useUserData()
// TODO: менять строчки местами сочетанием клавиш
const router = useRouter()
const { deleteChartById } = store
function handleDelete(){
  console.log(props.id)
  deleteChartById(props.id)
  router.push({name: 'home'})
}

</script>

<template>
  <div class="chart-controls">
    <VButton class="chart-controls__edit">Edit</VButton>
    <!--    TODO: error afted deletion-->
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
