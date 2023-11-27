<template>
  <button class="btn btn-primary mx-4 my-4" @click="isOpen = !isOpen">Filters</button>
  <div class="filters-container my-4" v-if="isOpen">
    <label class="form-label">Filter by Price:</label>
    <div class="input-group">
      <input v-model.number="minPrice" class="form-control" placeholder="Min" />
      <input v-model.number="maxPrice" class="form-control" placeholder="Max" />
    </div>

    <label class="form-label">Filter by Date:</label>
    <div class="input-group">
      <input type="date" v-model="startDate" class="form-control" />
      <input type="date" v-model="endDate" class="form-control" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.filters-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .input-group {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
    }
  }
}
</style>
