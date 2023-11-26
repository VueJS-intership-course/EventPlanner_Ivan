<template>
  <button class="btn btn-dark" @click="switchModal">Change Password</button>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal d-block" v-if="isOpen" @click="switchModal">
        <div class="modal-dialog modal-dialog-centered" @click.stop="">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Change Password</h5>
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
                  <div class="input-wrapper">
                    <BasicInput name="password" type="password" label="New Password" />
                  </div>
                  <div class="input-wrapper">
                    <BasicInput
                      name="passwordConfirm"
                      type="password"
                      label="Repeat Password"
                    />
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
import userStore from "@/store/userStore";
import { ref } from "vue";
import BasicInput from "./BasicInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";

const router = useRouter();

const useUserStore = userStore();

const isOpen = ref(false);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 symbols!")
      .required("This field is required!"),
    passwordConfirm: yup
      .string()
      .required("This field is required!")
      .min(6, "Password must be at least 6 symbols!")
      .oneOf([yup.ref("password")], "Passwords does not match!"),
  }),
});

const switchModal = () => {
  isOpen.value = !isOpen.value;
};

const onSubmit = handleSubmit((values, { resetForm }) => {
  useUserStore.updatePassword(values.password);
  resetForm();
  switchModal();
  router.push({ name: "login" });
});
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

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}
</style>
