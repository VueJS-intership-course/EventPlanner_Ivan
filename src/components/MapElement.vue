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
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Style } from "ol/style";
import Icon from "ol/style/Icon";
import * as olProj from "ol/proj";

import eventStore from "@/store/eventsStore";
import { onMounted, ref } from "vue";
import getCountryName from "@/utills/getCountryName.js";
import getTzFromCoords from "@/utills/getTzFromCoords.js";

const store = eventStore();
const map = ref(null);

const markerSource = new VectorSource();

const markerLayer = new VectorLayer({
  source: markerSource,
});

const initMap = () => {
  map.value = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([15, 50]),
      zoom: 4,
    }),
    target: map.value,
  });

  map.value.addLayer(markerLayer);

  const markerStyle = new Style({
    image: new Icon({
      src: "https://static.thenounproject.com/png/2317874-200.png",
      anchor: [0.5, 1],
      scale: 0.2,
    }),
  });

  map.value.on("click", async (evt) => {
    const clickedCoordinate = evt.coordinate;
    const transformedCoordnates = olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

    const addressData = await getCountryName(transformedCoordnates);

    const eventTimezone = getTzFromCoords(transformedCoordnates);

    store.eventCreationTz = eventTimezone;

    const markerFeature = new Feature({
      geometry: new Point(clickedCoordinate),
    });

    markerFeature.setStyle(markerStyle);

    markerSource.clear();
    markerSource.addFeature(markerFeature);
    store.eventCreationCoord = clickedCoordinate;
    store.eventCreationAddress = addressData;
  });
};

onMounted(initMap);
</script>

<style scoped>
.map {
  height: 40rem;
}
</style>
