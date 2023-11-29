import fireBaseData from "@/services/firebaseConfig";
import imageConverter from "@/utills/imageConverter.js";

export default {
  async getAll() {
    try {
      const data = [];
      const querySnapshot = await fireBaseData.fireStore.collection("events").get();

      querySnapshot.forEach((doc) => {
        const {
          id,
          name,
          ticketCount,
          ticketPrice,
          budget,
          timezone,
          description,
          address,
          imgSrc,
          time,
        } = doc.data();
        const event = {
          id,
          name,
          ticketCount,
          ticketPrice,
          budget,
          timezone,
          description,
          address,
          imgSrc,
          time,
        };
        data.push(event);
      });
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  async getById(eventId) {
    try {
      const querySnapshot = await fireBaseData.fireStore
        .collection("events")
        .where("id", "==", eventId)
        .get();
      if (querySnapshot.docs.length > 0) {
        const eventData = querySnapshot.docs[0].data();
        return eventData;
      } else {
        console.log("Event document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      throw error;
    }
  },

  async addEvent(event) {
    try {
      const blob = await imageConverter(event.imgSrc);
      await fireBaseData.fireStore.collection("events").add({
        id: event.id,
        name: event.name,
        ticketCount: event.ticketCount,
        ticketPrice: event.ticketPrice,
        budget: event.budget,
        timezone: event.timezone,
        description: event.description,
        location: event.location,
        address: event.address,
        time: event.time,
        imgSrc: blob,
        soldTo: [],
        expenses: [],
      });
      await this.getAll();
    } catch (error) {
      console.error("Error validating event:", error);
      throw error;
    }
  },

  async delete(eventId) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("events")
      .where("id", "==", eventId)
      .get();
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      try {
        await doc.ref.delete();
      } catch (error) {
        console.error("Error removing event: ", error);
      }
    }
  },

  async editEvent(event) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];
    const blob = await imageConverter(event.imgSrc);

    try {
      await doc.ref.update({
        name: event.name,
        ticketCount: event.ticketCount,
        ticketPrice: event.ticketPrice,
        budget: event.budget,
        description: event.description,
        time: event.time,
        timezone: event.timezone,
        imgSrc: blob,
      });
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  },

  async buyEventTicket(event) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        ticketCount: event.ticketCount,
        budget: event.budget,
        soldTo: event.soldTo,
      });
    } catch (error) {
      console.error("Error buying ticket: ", error);
    }
  },

  async addEventExpense(event) {
    const querySnapshot = await fireBaseData.fireStore
      .collection("events")
      .where("id", "==", event.id)
      .get();

    const doc = querySnapshot.docs[0];

    try {
      await doc.ref.update({
        budget: event.budget,
        expenses: event.expenses,
      });
    } catch (error) {
      console.error("Error buying ticket: ", error);
    }
  },
};
