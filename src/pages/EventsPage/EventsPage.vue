<template>
  <div class="mb-5">
    <h1 class="d-flex justify-content-center my-4">Events List</h1>
    <Filters />
    <div class="event-list mx-4" v-if="!isLoading">
      <div v-for="event in filteredEvent" :key="event.id" class="event-card">
        <img :src="event.imgSrc" class="event-image" alt="Event Image" />
        <div class="event-details">
          <h2>{{ event.name }}</h2>
          <div class="event-description">{{ event.description }}</div>
        </div>
        <div class="event-actions">
          <RouterLink
            class="btn btn-primary"
            :to="{ name: 'eventDetails', params: { eventId: event.id } }"
          >
            Learn more
          </RouterLink>
        </div>
      </div>
      <p v-if="filteredEvent.length === 0" class="m-auto">
        No events found matching the filters!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import eventStore from "@/store/eventsStore.js";
import Filters from "./Filters.vue";

const useEventStore = eventStore();

const eventList = ref([]);
const isLoading = ref(true);
const filteredEvent = computed(() => {
  return useEventStore.getAllEvents.length > useEventStore.filteredEvents.length
    ? useEventStore.filteredEvents
    : useEventStore.getAllEvents;
});

const populateEvents = async () => {
  try {
    await useEventStore.getEvents();
    eventList.value = [];
    eventList.value = useEventStore.getAllEvents;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching events:", error);
    isLoading.value = false;
  }
};

onMounted(populateEvents);
</script>

<style scoped lang="scss">
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.event-card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  width: 18.75rem;
  display: grid;
  align-items: stretch;
  align-content: space-between;
}

.event-image {
  width: 100%;
  height: 9.25rem;
  object-fit: cover;
}

.event-details {
  padding: 1rem;
}

.event-description {
  color: #555;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 15rem;
  overflow: hidden;
}

.event-actions {
  padding: 1rem;
  text-align: center;
}
</style>
