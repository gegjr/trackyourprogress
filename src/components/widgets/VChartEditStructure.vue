<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import { useUserData } from "@/stores/useUserData.ts";
import "vue3-colorpicker/style.css";
import {ref} from "vue";

const { currentChartObj, addEmptyBarDatasetsItem } = useUserData()
const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

function handleRemove(index: number){
  if (currentChartObj && currentChartObj.data.datasets.length > 1) {
    currentChartObj.data.datasets.splice(index, 1)
  }
}

function handleAddNew(){
  addEmptyBarDatasetsItem()
}
</script>

<template>
<div class="edit-structure">
  <h2 class="edit-structure__title">Edit structure</h2>
  <div class="edit-structure__body" v-if="currentChartObj">
    <!-- TODO: refactor v-model-->
    <div class="edit-structure__item" v-for="(item, i) in currentChartObj.data.datasets">
      <color-picker
          disableHistory
          v-model:pureColor="item.backgroundColor"
          v-model:gradientColor="gradientColor"
      />
      <input type="text" v-model="item.label">
      <VButton @click="handleRemove(i)">remove</VButton>
    </div>
  </div>
  <div class="edit-structure__controls">
    <VButton @click="handleAddNew">Add new "label"</VButton>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
