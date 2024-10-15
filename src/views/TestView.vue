<script setup lang="ts">
import {computed, ref} from "vue";

const innerRef = ref(['innerRef'])
const testRef = ref(['xxx', innerRef.value])
const testComputed = computed(() => testRef.value)
function handleTest(){
  console.log('test ^_^')
  testRef.value.push('test')
  innerRef.value.push('test')
}
</script>

<template>
  <h1>testing area</h1>
  <VButton @click="handleTest">Test</VButton>
  <p>{{ testRef }}</p>
  <p>{{ testComputed }}</p>
</template>

<style scoped lang="scss">

</style>
