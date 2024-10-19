<script setup lang="ts">

</script>

<template>
<div class="add-record">
  <h2 class="add-record__title">17-10</h2>
  <div class="add-record__body">
    <div class="add-record__item">
      <div class="add-record__data">
        <div class="add-record__data-item" v-for="i in 3">
          <h3 class="add-record__data-label">
            <i class="add-record__data-label-color"></i>
            Label 1
          </h3>
          <div class="add-record__data-value">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="add-record__item-content">
        <textarea
            class="add-record__item-content-comment"
            name=""
            id=""
            cols="30"
            rows="10"
        >
        </textarea>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
  .add-record {
    &__title {
      margin-bottom: 10px;
    }

    &__item {
       &-content {
        display: flex;
        flex-direction: column;
      }
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;

      &-item {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      &-label {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      &-label-color {
        display: block;
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
      }
    }
  }
</style>
