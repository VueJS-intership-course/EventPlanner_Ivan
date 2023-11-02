<!-- <template>
  <div ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

export default {
  name: "MapInitilization",
  emits: ["map-loaded"],
  data: () => {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
        target: this.$refs.map,
      });

      this.map.on("rendercomplete", this.emitMap);
    },
    emitMap() {
      this.$emit("map-loaded", this.map);
    },
  },
};
</script> -->

<template>
  <div ref="map" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { onMounted, ref } from "vue";

const emit = defineEmits(["map-loaded"]);

const map = ref(null);

const initMap = () => {
  map.value = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
    target: map.value, // Use map.value to access the DOM element
  });

  map.value.on("rendercomplete", emitMap);

  map.value.on("click", (evt) => {
    const transformedCoordinate = fromLonLat(evt.coordinate);

    console.log(transformedCoordinate);
  });
};

const emitMap = () => {
  emit("map-loaded", map.value);
};

onMounted(initMap);
</script>

<style scoped>
.map {
  height: 40rem;
}
</style>
