<template>
  <div>
    <h1>Events page</h1>
  </div>
  <div>
    <ul v-if="!isLoading">
      <li v-for="event in eventList" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useEventStore from "@/store/eventsStore.js";

const eventStore = useEventStore();

const eventList = ref([]);
const isLoading = ref(true);

const populateEvents = async () => {
  try {
    await eventStore.getEvents();
    eventList.value = [];
    eventList.value = eventStore.getAllEvents;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching events:", error);
    isLoading.value = false;
  }
};

onMounted(populateEvents);
</script>

<style lang="scss" scoped></style>
