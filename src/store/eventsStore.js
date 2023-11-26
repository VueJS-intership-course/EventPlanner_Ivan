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
    async buyTicket(event, user) {
      if (event.ticketCount < 1) {
        return;
      }

      --event.ticketCount;
      event.budget = event.budget + event.ticketPrice;
      event.soldTo = [...event.soldTo, user.email];

      try {
        await eventServices.buyEventTicket(event);
        await this.getEventById(event.id);
      } catch (error) {
        console.error("Error buying ticket: ", error);
      }
    },
    async deleteEvent(id) {
      try {
        await eventServices.delete(id);
        await this.getEvents();
      } catch (error) {
        console.error("Error removing an event:", error);
      }
    },
    async editEvent(event) {
      try {
        await eventServices.editEvent(event);
        await this.getEventById(event.id);
        this.eventCreationAddress = null;
        this.eventCreationCoord = null;
        this.eventCreationTz = null;
      } catch (error) {
        console.error("Error editing event:", error);
      }
    },
  },
});

export default eventStore;
