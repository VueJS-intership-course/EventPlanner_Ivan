<template>
  <div class="d-flex flex-column align-items-center event-container mt-4">
    <div>
      <div>
        <h2 class="my-3">{{ event?.name }}</h2>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div>
        <img :src="event?.imgSrc" class="rounded" alt="Event Image" />
      </div>
      <div class="d-flex flex-column info-wrapper">
        <div class="info-item mb-4">
          <label>Address:</label>
          <span>{{ event?.address }}</span>
        </div>
        <div class="info-item mb-4">
          <label>Timezone:</label>
          <span>{{ event?.timezone }}</span>
        </div>
        <div class="info-item mb-4">
          <label>Ticket Count:</label>
          <span>{{ event?.ticketCount ? event.ticketCount : "SOLD OUT!" }}</span>
        </div>
        <div class="info-item mb-4">
          <label>Ticket Price:</label>
          <span>{{ event?.ticketPrice }} $</span>
        </div>
        <div class="info-item mb-4">
          <label>Budget:</label>
          <span>{{ event?.budget }} $</span>
        </div>
        <div class="info-item mb-4">
          <label v-if="user">Date and time in your timezone:</label>
          <label v-else>Date and time in UTC:</label>
          <span>{{ date }}</span>
        </div>
        <button
          class="btn btn-primary mb-4"
          @click="buyHandler"
          v-if="event?.ticketCount && user && user.role !== 'admin' && !isBought"
        >
          Buy ticket
        </button>
        <div class="my-4" v-if="!user">
          <span>Want to buy a ticket? </span>
          <RouterLink :to="{ name: 'login' }">Click here to sign in</RouterLink>
        </div>
        <!-- <span v-if="!event.ticketCount" class="btn btn-danger">SOLD OUT!</span> -->
        <div v-if="user?.role === 'admin'" class="d-flex gap-2">
          <!-- <button class="btn btn-primary">Edit</button> -->
          <EventEditModal />
          <button class="btn btn-danger" @click="deleteHandler">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import eventStore from "@/store/eventsStore.js";
import userStore from "@/store/userStore.js";
import timeConvert from "@/utills/convertToTimezone.js";
import EventEditModal from "@/components/EventEditModal.vue";

const useEventStore = eventStore();
const useUserStore = userStore();

const route = useRoute();
const router = useRouter();
const eventId = ref(route.params);
const event = computed(() => useEventStore.selectedEvent);
const user = computed(() => useUserStore.currentUser);
const isBought = computed(() => {
  return event.value.soldTo.includes(user.value.email) ? true : false;
});

useEventStore.getEventById(eventId.value.eventId);

const date = computed(() => {
  if (useUserStore.currentUser) {
    const userTz = useUserStore.currentUser.timezone;
    const result = timeConvert(event.value?.time, userTz);
    return result;
  } else {
    const result = timeConvert(event.value?.time);
    return result;
  }
});

const buyHandler = () => {
  useEventStore.buyTicket(event.value, user.value);
};

const deleteHandler = () => {
  useEventStore.deleteEvent(event.value.id);
  router.push({ name: "events" });
};

onBeforeUnmount(() => {
  useEventStore.selectedEvent = null;
});
</script>

<style lang="scss" scoped>
.event-container {
  margin: 1rem;
  padding: 1rem;
  border: 0.25rem solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  max-width: 50rem;
  margin: auto;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  img {
    max-width: 24rem;
  }

  .info-wrapper {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .info-item {
      margin: 0.25rem 0;

      label {
        font-size: 1.125rem;
        font-weight: bold;
      }

      .data {
        font-size: 1rem;
      }
    }

    button {
      margin-top: 0.5rem;
    }
  }
}
</style>
