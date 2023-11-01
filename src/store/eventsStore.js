import { defineStore } from "pinia";
import eventServices from "@/services/eventServices";

const useEventStore = defineStore("event", {
  state: () => ({
    allEvents: [],
  }),
  getters: {
    getAllEvents(state) {
      if (state.allEvents !== null) return state.allEvents;
    },
  },
  actions: {
    async getEvents() {
      try {
        const response = await eventServices.getAll();
        response.forEach((event) => this.allEvents.push(event));
      } catch (error) {
        console.log("There was a problem fetching events:", error);
      }
    },
  },
});

export default useEventStore;
