<script setup lang="ts">
import VSidebar from "./components/VSidebar.vue";
// TODO: how does ref() WORK ??!!!?!?!?!?!?!


</script>

<template>
  <!--  TODO: IDE linting-->
  <div class="container">
    <VSidebar/>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    height: 100%;
    min-width: 600px;
    max-width: 1280px;
    width: 100%;
    max-height: 800px;
    margin: 0 auto;
    align-self: center;
    border: 1px solid grey;
    border-radius: 8px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px;
    position: relative;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 5px;
      display: none;
    }

    &::-webkit-scrollbar-track {
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 8px;
      background-color: #f3f3f3;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      width: 5px;
      background-color: lightgray;
    }
  }
</style>
