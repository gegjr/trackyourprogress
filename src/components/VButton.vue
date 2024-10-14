<script setup lang="ts">
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <button @click="handleClick"><slot></slot></button>
</template>

<style scoped lang="scss">
  button {
    border: 1px solid transparent;
    outline: 1px solid grey;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover {
      border-color: lightpink;
    }

    &:focus,
    &:focus-visible{
      outline: 1px solid -webkit-focus-ring-color;
    }
  }
</style>
