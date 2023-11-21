import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import firebaseData from "@/services/firebaseConfig";
import userStore from "@/store/userStore.js";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import mapInit from "highcharts/modules/map";
import mapData from "@highcharts/map-collection/custom/world.geo.json";
import eventStore from "@/store/eventsStore";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCoffee, faCog } from "@fortawesome/free-solid-svg-icons";

mapInit(Highcharts);

Highcharts.maps["myMapName"] = mapData;

const pinia = createPinia();

library.add(faCoffee, faCog);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

const useUserStore = userStore();
const useEventStore = eventStore();

useEventStore.getEvents();

function onAuthStateChangedPromise() {
  return new Promise((resolve, reject) => {
    firebaseData.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await useUserStore.setCurrentUser(user.email);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        useUserStore.setCurrentUser(null);
        resolve();
      }
    });
  });
}

await onAuthStateChangedPromise();

app.use(router);

app.use(HighchartsVue);

app.mount("#app");
