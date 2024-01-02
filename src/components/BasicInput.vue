<template>
  <label :for="name" class="form-label">{{ `${label}:` }}</label>
  <input v-model="value" :type="type" class="form-control" :class="class" />
  <span>{{ errorMessage }}</span>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  type: { type: String, default: "" },
  label: { type: String, required: true, default: "" },
  class: { type: String, default: "" },
});

const { value, errorMessage } = useField(() => props.name);
</script>

<style lang="scss" scoped>
// change style , remove position absolute
// delete pockachane
span {
  position: absolute;
  color: red;
  left: 0%;
}

label {
  font-weight: bold;
}
</style>
