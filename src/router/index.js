import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage/HomePage.vue";
import EventsPage from "@/pages/EventsPage/EventsPage.vue";
import ProfilePage from "@/pages/ProfilePage/ProfilePage.vue";
import CreateEventPage from "@/pages/CreateEventPage/CreateEventPage.vue";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.vue";
import LoginPage from "@/pages/LoginPage/LoginPage.vue";

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
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/create-event",
    name: "createEvent",
    component: CreateEventPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
