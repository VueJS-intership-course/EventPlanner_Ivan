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
            <UserEditModal />
            <ChangePasswordModal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserEditModal from "@/components/UserEditModal.vue";
import ChangePasswordModal from "@/components/ChangePasswordModal.vue";
import userStore from "@/store/userStore";
import { computed } from "vue";

const useUserStore = userStore();

const user = computed(() => useUserStore.currentUser);
</script>

<style lang="scss" scoped>
.container {
  max-width: 50rem;
}
</style>
