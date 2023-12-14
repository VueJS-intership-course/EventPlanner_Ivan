<template>
  <div class="custom-select">
    <label for="timezone">City/State or Timezone:</label>
    <input
      class="form-control"
      v-model="search"
      @input="filterOptions"
      @focus="isOpen = true"
      placeholder="Select an option"
    />
    <ul v-show="isOpen" class="options-list">
      <li
        v-for="option in filteredOptions"
        @click="selectOption(option)"
        @mousedown="filterOptions"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import moment from "moment-timezone";

const emit = defineEmits(["update:modelValue"]);

const search = ref("");
const isOpen = ref(false);
const options = moment.tz.names();

const filteredOptions = computed(() => {
  return options.filter((option) => option.toLowerCase().includes(search.value.toLowerCase()));
});

const filterOptions = () => {
  isOpen.value = true;
};

const selectOption = (option) => {
  search.value = option;
  isOpen.value = false;
  if (search.value !== "") emit("update:modelValue", search.value);
};
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}
.custom-select {
  position: relative;
  display: block;
  margin-top: 0.5rem;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    margin-top: 0.5rem;
  }

  ul.options-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 1px solid #dee2e6;
    border-top: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;

    li {
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
