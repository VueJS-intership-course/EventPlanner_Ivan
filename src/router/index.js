import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage/HomePage.vue";
import EventsPage from "@/pages/EventsPage/EventsPage.vue";
import EventDetailsPage from "@/pages/EventDetailsPage/EventDetailsPage.vue";
import ProfilePage from "@/pages/ProfilePage/ProfilePage.vue";
import CreateEventPage from "@/pages/CreateEventPage/CreateEventPage.vue";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage/LoginPage.vue";
import userStore from "@/store/userStore";

// chunks
// meta requiresAuth
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/events",
    name: "events",
    component: EventsPage,
  },
  {
    path: "/events/:eventId",
    name: "eventDetails",
    component: EventDetailsPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    beforeEnter: () => {
      const store = userStore();
      if (!store.currentUser) {
        router.push({ name: "login" });
      }
    },
  },
  {
    path: "/create-event",
    name: "createEvent",
    component: CreateEventPage,
    beforeEnter: () => {
      const store = userStore();
      const userRole = store.currentUser?.role;
      if (!store.currentUser && userRole !== "admin") {
        router.push({ name: "home" });
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    beforeEnter: () => {
      const store = userStore();
      if (store.currentUser) {
        router.push({ name: "home" });
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: () => {
      const store = userStore();
      if (store.currentUser) {
        router.push({ name: "home" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
