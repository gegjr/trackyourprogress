<script setup lang="ts">
import { useUserData } from "@/stores/useUserData.ts";
import { useRoute } from "vue-router";

const { getChartByUrl } = useUserData()
const emit = defineEmits(['add-new-bar', 'delete-data', 'add-data'])

// TODO: получать объект из стора
const { params } = useRoute()
const chartObj = getChartByUrl(params.url)
const editableObj = chartObj.data

function handleAddSingleBar(index){
  emit('add-new-bar', index)
}

function handleDeleteData(index){
  emit('delete-data', index)
}

function handleAddData(index){
  emit('add-data', index)
}
</script>

<template>
  <div class="chart-edit">
    <h2 class="chart-edit__data-title">Edit data</h2>
    <div class="chart-edit__data">
      <div class="chart-edit__data-content">
        <div class="grid-table">
        <!-- TODO: использовать болванки базовых компонентов -->
          <div class="grid-table__row" v-for="(item,i) in editableObj.labels.length" :key="editableObj.labels[i] + editableObj.datasets[0].label">
            <div class="grid-table__column">{{ i }}.</div>
            <div class="grid-table__column">
              <input type="text" v-model="editableObj.labels[i]">
            </div>
            <div class="grid-table__column">
              <div class="grid-table__column-content" v-for="(item, j) in editableObj.datasets" :key="item.label + j">
                <input type="text" v-model="item.data[i]">
              </div>
            </div>
            <div class="grid-table__column grid-table__actions">
              <VButton class="grid-table__btn" @click="handleAddSingleBar(i)">+</VButton>
              <VButton class="grid-table__btn" @click="handleDeleteData(i)">Del</VButton>
            </div>
          </div>
        </div>
        <VButton @click="handleAddData" class="chart-edit__add-row">Add data</VButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .chart-edit {
    &__data {
      height: 390px;
      overflow-y: scroll;
    }

    &__add-row {
      position: sticky;
      bottom: 0;
      left: 0;
    }
  }

  .grid-table {
    &__row {
      min-width: 0;
      display: grid;
      grid-template-columns: 35px 1fr 1fr 75px;
      overflow: hidden;
      border-top: 1px solid grey;

      &:last-child {
        border-bottom: 1px solid grey;
      }
    }

    &__column {
      border-right: 1px solid grey;
      padding: 5px;

      input {
        width: 100%;
      }

      &:first-child {
        border-left: 1px solid grey;
      }
    }

    &__btn {
      padding: 5px 10px;
    }
  }
</style>
