<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Profile</div>

          <div class="card-body">
            <div class="text-center">
              <img
                alt="Profile Image"
                src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-10.jpg"
                class="img-fluid mb-3"
                style="width: 150px; height: 150px"
              />
            </div>

            <div class="form-group my-4">
              <label for="email">Email:</label>
              <span class="form-control">{{ user.email }}</span>
            </div>

            <div class="form-group my-4">
              <label for="timezone">Timezone:</label>
              <span class="form-control">{{ user.timezone }}</span>
            </div>
          </div>
          <div class="form-group d-flex justify-content-center mb-4 gap-4">
            <UserEdit />
            <ChangePassword />
          </div>
        </div>
        <div class="my-5">
          <Calendar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userStore from "@/store/userStore";
import { computed } from "vue";
import Calendar from "@/pages/ProfilePage/Calendar.vue";
import ChangePassword from "./ChangePassword.vue";
import UserEdit from "./UserEdit.vue";

const useUserStore = userStore();

const user = computed(() => useUserStore.currentUser);

const date = computed(() => {
  if (useUserStore.currentUser) {
    const userTz = useUserStore.currentUser.timezone;
    const result = timeConvert(event.value?.time, userTz);
    return result;
  } else {
    const result = timeConvert(event.value?.time);
    return result;
  }
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 50rem;
}
</style>
