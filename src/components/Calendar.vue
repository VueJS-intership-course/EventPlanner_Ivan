<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { computed, ref } from "vue";
import eventStore from "@/store/eventsStore";
import moment from "moment";
import { useRouter } from "vue-router";

const useEventStore = eventStore();

const router = useRouter();

const events = computed(() => useEventStore.getAllEvents);

const calendarEvents = computed(() =>
  events.value.map((evnt) => {
    const convertedDate = moment(evnt.time).format("YYYY-MM-DD");
    return { title: evnt.name, date: convertedDate, id: evnt.id };
  })
);

const handleDateClick = (eventInfo) => {
  console.log(eventInfo.event.id);
  router.push({ name: "eventDetails", params: { eventId: eventInfo.event.id } });
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  eventClick: handleDateClick,
  events: calendarEvents,
});
</script>

<style lang="scss" scoped></style>
