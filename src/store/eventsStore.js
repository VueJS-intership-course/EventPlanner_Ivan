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
    filters: {
      minPrice: null,
      maxPrice: null,
      startDate: null,
      endDate: null,
    },
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
    filteredEvents() {
      return this.allEvents.filter((event) => {
        const priceCondition =
          (!this.filters.minPrice || event.ticketPrice >= this.filters.minPrice) &&
          (!this.filters.maxPrice || event.ticketPrice <= this.filters.maxPrice);
        const dateObject = new Date(event.time);

        const formattedDate = dateObject.toISOString().split("T")[0];
        const dateCondition =
          (!this.filters.startDate || formattedDate >= this.filters.startDate) &&
          (!this.filters.endDate || formattedDate <= this.filters.endDate);
        return priceCondition && dateCondition;
      });
    },
    hasFilters() {
      return Object.values(this.filters).some((filter) => filter !== null && filter !== "");
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
        console.log("Error buying ticket: ", error);
      }
    },
    async addExpense(expense) {
      if (this.selectedEvent.budget < expense.amount) {
        alert("Expense is over budget!");
        return;
      }
      this.selectedEvent.budget = this.selectedEvent.budget - expense.amount;

      const transformedExpense = {
        name: expense.category,
        y: expense.amount,
      };

      const existingIndex = this.selectedEvent.expenses.findIndex(
        (obj) => obj.name.toLowerCase() === transformedExpense.name.toLowerCase()
      );
      if (existingIndex !== -1) {
        this.selectedEvent.expenses[existingIndex].y += transformedExpense.y;
      } else {
        this.selectedEvent.expenses = [...this.selectedEvent.expenses, transformedExpense];
      }

      try {
        await eventServices.addEventExpense(this.selectedEvent);
        await this.getEventById(this.selectedEvent.id);
      } catch (error) {
        console.log("There was a problem adding expense:", error);
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
    clearFilters() {
      this.filters = {
        minPrice: null,
        maxPrice: null,
        startDate: null,
        endDate: null,
      };
    },
  },
});

export default eventStore;
