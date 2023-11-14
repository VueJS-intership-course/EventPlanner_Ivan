<template>
  <div class="d-flex flex-column align-items-center event-container">
    <div>
      <div>
        <h2>{{ event.name }}</h2>
      </div>
    </div>
    <div class="d-flex">
      <div>
        <img src="https://picsum.photos/600/400" />
      </div>
      <div class="d-flex info-wrapper">
        <div class="info-item">
          <label class="label">Address: </label>
          <span class="data"> {{ event.address }}</span>
        </div>
        <div class="info-item">
          <label class="label">Timezone: </label>
          <span class="data"> {{ event.timezone }}</span>
        </div>
        <div class="info-item">
          <label class="label">Ticket Count: </label>
          <span class="data"> {{ event.ticketCount }}</span>
        </div>
        <div class="info-item">
          <label class="label">Ticket Price: </label>
          <span class="data"> {{ event.ticketPrice }} $</span>
        </div>
        <div class="info-item">
          <label class="label">Budget: </label>
          <span class="data"> {{ event.budget }} $</span>
        </div>
        <button
          class="btn btn-primary"
          @click="buyHandler"
          v-if="event.ticketCount && useUserStore.currentUser"
        >
          Buy ticket
        </button>
        <span v-if="!useUserStore.currentUser">Want to buy a ticket? </span>
        <RouterLink :to="{ name: 'login' }" v-if="!useUserStore.currentUser"
          >Click here to sign in</RouterLink
        >
        <span v-if="!event.ticketCount" class="btn btn-danger">SOLD OUT!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import useEventStore from "@/store/eventsStore.js";
import userStore from "@/store/userStore";
import eventServices from "@/services/eventServices";

const eventStore = useEventStore();
const useUserStore = userStore();

const route = useRoute();
const eventId = ref(route.params);
const event = computed(() => eventStore.selectedEvent);

eventStore.getEventById(eventId.value.eventId);

const buyHandler = () => {
  if (event.value.ticketCount > 0) {
    --event.value.ticketCount;
    event.value.budget = event.value.budget + event.value.ticketPrice;
  }
  eventServices.buyEventTicket(event.value);
};
</script>

<style lang="scss" scoped>
.event-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 50rem;
  margin: auto;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
  }

  .info-wrapper {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .info-item {
      margin: 5px 0;

      .label {
        font-size: 18px; /* Adjust the font size for labels */
        font-weight: bold; /* Make labels bold */
      }

      .data {
        font-size: 16px; /* Adjust the font size for data */
      }
    }

    button {
      margin-top: 10px;
    }
  }
}
</style>
