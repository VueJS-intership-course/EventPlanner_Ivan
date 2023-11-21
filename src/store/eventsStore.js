import { defineStore } from "pinia";
import eventServices from "@/services/eventServices";

const eventStore = defineStore("event", {
  state: () => ({
    allEvents: null,
    selectedEvent: {},
    eventCountries: null,
    eventCreationCoord: null,
    eventCreationAddress: null,
    eventCreationTz: null,
  }),
  getters: {
    getAllEvents(state) {
      if (state.allEvents !== null) return state.allEvents;
    },
    getEventCountries(state) {
      if (state.allEvents !== null) {
        const arrCountriesCount = state.allEvents.reduce((acc, item) => {
          const [country] = item.address.split(", ").reverse();
          const normalizedCountry =
            country === "United States" ? "United States of America" : country;

          const existingCountry = acc.find((c) => c.name === normalizedCountry);

          if (existingCountry) {
            existingCountry.value += 1;
          } else {
            acc.push({ name: normalizedCountry, value: 1 });
          }

          return acc;
        }, []);

        state.eventCountries = arrCountriesCount;

        return state.eventCountries;
      }
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

export default eventStore;
