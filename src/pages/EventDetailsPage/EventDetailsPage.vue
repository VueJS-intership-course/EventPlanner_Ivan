<template>
  <div>
    <h1>Event details page</h1>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import eventServices from "@/services/eventServices.js";

const route = useRoute();
const eventId = ref(route.params);

watch(
  eventId,
  (newVal) => {
    if (newVal) {
      console.log(newVal);
      eventServices.getOne(newVal.eventId);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
