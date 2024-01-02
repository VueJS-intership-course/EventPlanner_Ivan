import { createRouter, createWebHistory } from "vue-router";
import userStore from "@/store/userStore";

// meta requiresAuth
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage/HomePage.vue"),
  },
  {
    path: "/events",
    name: "events",
    component: () => import("@/pages/EventsPage/EventsPage.vue"),
  },
  {
    path: "/events/:eventId",
    name: "eventDetails",
    component: () => import("@/pages/EventDetailsPage/EventDetailsPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/ProfilePage/ProfilePage.vue"),
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
    component: () => import("@/pages/CreateEventPage/CreateEventPage.vue"),
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
    component: () => import("@/pages/RegisterPage/RegisterPage.vue"),
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
    component: () => import("@/pages/LoginPage/LoginPage.vue"),
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
