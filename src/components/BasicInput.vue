<template>
  <label :for="name" class="form-label">{{ `${label}:` }}</label>
  <input v-model="value" :type="type" class="form-control" :class="class" />
  <span>{{ errorMessage }}</span>
</template>
<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: String,
  type: String,
  label: String,
  class: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  color: red;
  left: 0%;
}

input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
