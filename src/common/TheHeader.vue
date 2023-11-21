<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'home' }" class="nav-link navbar-brand">Avantim</RouterLink>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{ name: 'events' }" class="nav-link">Events</RouterLink>
          </li>
          <li class="nav-item" v-if="!store.currentUser">
            <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
          </li>
          <li class="nav-item" v-if="store.currentUser?.role === 'admin'">
            <RouterLink :to="{ name: 'createEvent' }" class="nav-link">
              Create event</RouterLink
            >
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <img
            src="@/assets/wrench.png"
            alt="wrench-icon"
            class="admin-icon"
            v-if="store.currentUser.role === 'admin'"
          />
          <span class="nav-item username mx-3">
            {{ store.getCurrentUserEmail }}
          </span>
          <button @click="logoutHandler" v-if="store.currentUser" class="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import userStore from "@/store/userStore.js";

const store = userStore();

const logoutHandler = () => {
  store.logoutUser();
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-size: 1.5rem;
  color: white;
}

.nav-link {
  color: white;
}

.username {
  color: white;
}

.admin-icon {
  height: 1.2rem;
}
</style>
