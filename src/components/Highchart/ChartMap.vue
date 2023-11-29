<template>
  <highcharts
    :constructor-type="'mapChart'"
    :options="mapOptions"
    class="map mt-5"
  ></highcharts>
</template>

<script setup>
import { ref, computed } from "vue";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import eventStore from "@/store/eventsStore";

const useEventStore = eventStore();

const eventCountries = computed(() => useEventStore.getEventCountries);

const mapOptions = ref({
  chart: {
    map: mapData,
  },
  title: {
    text: "Events in countries",
  },
  series: [
    {
      data: eventCountries.value,
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

// onMounted(populateEvents);
</script>

<style scoped>
.map {
  min-height: 500px;
}
</style>
