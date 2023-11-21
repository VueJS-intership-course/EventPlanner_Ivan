<template>
  <div>
    <h1>Events page</h1>
  </div>
  <div>
    <ul v-if="!isLoading">
      <li v-for="event in eventList" :key="event.id">
        <div>
          <h2>{{ event.name }}</h2>
          <span>{{ event.description }}</span>
        </div>
        <div>
          <RouterLink
            class="btn btn-primary"
            :to="{ name: 'eventDetails', params: { eventId: event.id } }"
            >Learn more</RouterLink
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import eventStore from "@/store/eventsStore.js";

const useEventStore = eventStore();

const eventList = ref([]);
const isLoading = ref(true);

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

<style lang="scss" scoped>
div {
  margin: 10px;
  padding: 10px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 0 0 calc(33.3333% - 20px);
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 18px;
        margin: 0;
        padding: 10px;
      }

      span {
        flex-grow: 1;
        font-size: 14px;
        color: #666;
        padding: 10px;
      }

      button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 0 0 5px 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
    }
  }

  @media (max-width: 768px) {
    ul {
      li {
        flex: 0 0 calc(50% - 20px);
      }
    }
  }

  @media (max-width: 576px) {
    ul {
      li {
        flex: 0 0 calc(100% - 20px);
      }
    }
  }
}
</style>
