import fireBaseData from "@/services/firebaseConfig";

export default {
  async getAll() {
    try {
      const data = [];
      const querySnapshot = await fireBaseData.fireStore.collection("events").get();

      querySnapshot.forEach((doc) => {
        const { id, name, ticketCount, ticketPrice, budget, timezone, description, address } =
          doc.data();
        const event = {
          id,
          name,
          ticketCount,
          ticketPrice,
          budget,
          timezone,
          description,
          address,
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
      });
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
    try {
      await doc.ref.update({
        name: event.name,
        price: event.price,
        description: event.description,
        category: event.category,
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
      });
    } catch (error) {
      console.error("Error editing event: ", error);
    }
  },
};
