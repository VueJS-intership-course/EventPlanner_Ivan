<template>
  <button class="btn btn-dark" @click="switchModal">Edit Email and Password</button>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal d-block" v-if="isOpen" @click="switchModal">
        <div class="modal-dialog modal-dialog-centered" @click.stop="">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Email and Timezone</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="switchModal"
              >
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex flex-column p-2 main-container my-4">
                <form @submit.prevent="onSubmit">
                  <div class="input-wrapper mt-4">
                    <label class="form-label">Email:</label>
                    <input v-model="emailInput" class="form-control" />
                  </div>
                  <div class="input-wrapper mt-4">
                    <DropdownSelect v-model="timezoneInput" />
                    <p class="mt-2">
                      If nothing is selected , the previous one will be saved .
                    </p>
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">Save changes</button>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="switchModal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import DropdownSelect from "@/components/dropdownSelect.vue";
import userStore from "@/store/userStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const useUserStore = userStore();

const isOpen = ref(false);
const timezoneInput = ref(null);

const switchModal = () => {
  isOpen.value = !isOpen.value;
};

const user = computed(() => {
  return useUserStore.currentUser;
});

const emailInput = ref(user.value.email);

const tzResult = computed(() => timezoneInput.value || user.value.timezone);

const onSubmit = () => {
  useUserStore.updateEmailandTz(emailInput.value, tzResult.value);
  switchModal();
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

label {
  font-weight: bold;
}
</style>
