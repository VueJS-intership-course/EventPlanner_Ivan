<template>
  <highcharts
    :constructor-type="'mapChart'"
    :options="mapOptions"
    class="map mt-5"
  ></highcharts>
</template>

<script setup>
import { ref, watch } from "vue";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import eventStore from "@/store/eventsStore";

const useEventStore = eventStore();

const eventData = ref([]);

watch(
  () => useEventStore.getEventCountries,
  (newState) => {
    console.log("State changed:", newState);

    newState.forEach((element) => {
      eventData.value.push(element);
    });
    //
  }
);

const mapOptions = ref({
  chart: {
    map: mapData,
  },
  title: {
    text: "Events in countries",
  },
  series: [
    {
      data: eventData.value,
      name: "Number of events",
      joinBy: "name",
      states: {
        hover: {
          color: "#000088",
        },
      },
    },
  ],
  accessibility: {
    enabled: false,
  },
});
</script>

<style scoped>
.map {
  min-height: 500px;
}
</style>
