<script setup lang="ts">
import draggable from 'vuedraggable'

</script>

<template>
  <draggable
      v-model="myArray"
      group="people"
      @start="drag=true"
      @end="drag=false"
      item-key="id">
    <template #item="{element}">
      <div>{{element.name}}</div>
    </template>
  </draggable>
</template>

<style scoped lang="scss">

</style>
