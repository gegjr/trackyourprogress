<script setup lang="ts">
import {computed, ref} from "vue";
import { useUserData } from "@/stores/useUserData.ts";
import {useRouter} from "vue-router";

const store = useUserData()
const { addUserData } = store
const router = useRouter()

const title = ref('')
const type = ref('bar')
const description = ref('')
const url = computed(() => {
  return (title.value.split(" ").join("-") + "-" + type.value).toLowerCase()
})
// TODO: уникальный айди или url?
const id = computed(() => {
  return url.value
})
// TODO: ТИПЫ!!!!!
const data = {
  labels: [ '1!', '2', '3' ],
  datasets: [
    {
      label: "Label 1",
      backgroundColor: "#333333",
      data: [3, 7, 4]
    },
    {
      label: "Label 2",
      backgroundColor: "#9a9a9a",
      data: [4, 2, 6]
    }
  ]
}
function addNewChart(){
  addUserData({
    title: title.value,
    type: type.value,
    description: description.value,
    url: url.value,
    data: data,
    id: id.value
  })
  router.push({ path:`/${url.value}`})
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
