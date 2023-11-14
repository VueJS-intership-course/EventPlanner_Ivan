import { defineStore } from "pinia";
import eventServices from "@/services/eventServices";

const useEventStore = defineStore("event", {
  state: () => ({
    allEvents: [],
    selectedEvent: {},
    eventCreationCoord: null,
    eventCreationAddress: null,
  }),
  getters: {
    getAllEvents(state) {
      if (state.allEvents !== null) return state.allEvents;
    },
  },
  actions: {
    async getEvents() {
      try {
        this.allEvents = [];
        const response = await eventServices.getAll();
        response.forEach((event) => this.allEvents.push(event));
      } catch (error) {
        console.log("There was a problem fetching events:", error);
      }
    },
    async getEventById(id) {
      try {
        this.selectedEvent = await eventServices.getById(id);
      } catch (error) {
        console.log("There was a problem fetching the event details:", error);
      }
    },
  },
});

export default useEventStore;
