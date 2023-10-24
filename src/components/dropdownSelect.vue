<template>
  <div>
    <v-select v-model="selectedValue" :options="options"></v-select>
    <p>Selected Value: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment-timezone";

const options = moment.tz.names();

const selectedValue = ref(null);
</script>
