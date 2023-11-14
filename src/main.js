import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import firebaseData from "@/services/firebaseConfig";
import userStore from "@/store/userStore.js";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

const store = userStore();

firebaseData.fireAuth.onAuthStateChanged((user) => {
  if (user) {
    store.setCurrentUser(user);
  } else {
    store.setCurrentUser(null);
  }
});

app.use(router);

app.mount("#app");
