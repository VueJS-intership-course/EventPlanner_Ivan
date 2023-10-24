<template>
  <div class="d-flex flex-column p-2 main-container">
    <h1>Register Page</h1>

    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address:</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password:</label>
        <input type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Repeat Password:</label>
        <input type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="timezone">City or State</label>
        <DropdownSelect />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DropdownSelect from "../../components/dropdownSelect.vue";

const selectedValue = ref(null);

// Initialize Select2 when the component is mounted
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 30rem;
  margin: auto;
}
</style>
