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
            <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
          </li>
          <li class="nav-item" v-if="!store.currentUser">
            <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'createEvent' }" class="nav-link">
              Create event</RouterLink
            >
          </li>

          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
          <li class="nav-item username">
            {{ store.getCurrentUserEmail }}
          </li>
        </ul>
        <div>
          <span></span>
        </div>
        <!-- <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn bg-success text-light" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import userStore from "@/store/userStore.js";

const store = userStore();
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.username {
  align-self: center;
}
</style>
