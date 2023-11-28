<template>
  <button class="btn btn-primary mx-4 my-4" @click="isOpen = !isOpen">
    Filters
    <span class="red-dot" v-if="useEventStore.hasFilters"></span>
  </button>
  <div class="filters-container mb-4" v-if="isOpen">
    <label class="form-label">Filter by Price:</label>
    <div class="input-group">
      <input
        v-model.number="useEventStore.filters.minPrice"
        class="form-control"
        placeholder="Min"
        type="number"
      />
      <input
        v-model.number="useEventStore.filters.maxPrice"
        class="form-control"
        placeholder="Max"
        type="number"
      />
    </div>
    <p v-if="priceError" class="error">Max price can't be lower than Min price!</p>
    <label class="form-label">Filter by Date:</label>
    <div class="input-group">
      <input type="date" v-model="useEventStore.filters.startDate" class="form-control" />
      <input type="date" v-model="useEventStore.filters.endDate" class="form-control" />
    </div>
    <p v-if="dateError">Max price can't be lower than Min price!</p>

    <button class="btn btn-dark my-4" @click="useEventStore.clearFilters">
      Clear filters
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import eventStore from "@/store/eventsStore";

const useEventStore = eventStore();

const isOpen = ref(false);

const minPrice = ref(useEventStore.filters.minPrice);
const maxPrice = ref(useEventStore.filters.maxPrice);
const startDate = ref(useEventStore.filters.startDate);
const endDate = ref(useEventStore.filters.endDate);

const filters = computed(() => useEventStore.filters);

const priceError = computed(
  () =>
    filters.value.minPrice !== null &&
    filters.value.maxPrice !== null &&
    filters.value.maxPrice < filters.value.minPrice
);

const dateError = computed(
  () =>
    filters.value.startDate !== null &&
    filters.value.endDate !== null &&
    filters.value.endDate < filters.value.startDate
);
</script>

<style lang="scss" scoped>
.filters-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  .error {
    color: red;
  }

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
.red-dot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
}

.btn-primary {
  position: relative;
}
</style>
