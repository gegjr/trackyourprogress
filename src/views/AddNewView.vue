<script setup lang="ts">
import {computed, ref} from "vue";
import { useUserData } from "@/stores/useUserData.ts";

const store = useUserData()
const { addUserData } = store

const title = ref('')
const type = ref('')
const description = ref('')
const url = computed(() => {
  return (title.value.split(" ").join("-") + "-" + type.value).toLowerCase()
})
// TODO: ТИПЫ!!!!!
const data = {
  labels: [ 'January', 'February', 'March' ],
  datasets: [ { data: [40, 20, 12] } ]
}
function addNewChart(){
  addUserData({
    title,
    type,
    description,
    url,
    data
  })
}
</script>

<template>
<!--  TODO: вынести в компонент-->
  <div class="form">
    <label for="title">
      <span>Title</span>
      <input type="text" id="title" v-model="title">
    </label>

    <label for="type">
      <span>Type</span>
      <select id="type" v-model="type">
        <option value="bar">Bar chart</option>
        <option value="point">Point chart</option>
        <option value="radar">Radar chart</option>
      </select>
    </label>

    <label for="description">
      <span>Description(optional)</span>
      <textarea name="" id="description" cols="30" rows="10" v-model="description"></textarea>
    </label>

    <VButton @click="addNewChart">Add new chart</VButton>
  </div>
</template>

<style scoped lang="scss">
  .form {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin: 0 auto;
    align-self: center;
    padding: 20px;
    border:1px solid grey;
  }

  label {
    display: flex;
    flex-direction: column;
    gap:4px;
  }
</style>
